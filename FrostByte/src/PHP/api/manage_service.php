<?php
/**
 * API Endpoint: Manage Service Requests (Approve/Reject/Assign Technician)
 * Path: /FrostByte/src/PHP/api/manage_service.php
 * Methods: POST (approve/reject/assign)
 */

session_start();
header('Content-Type: application/json');

// Check admin authentication
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit();
}

// Get request parameters
$action = $_POST['action'] ?? null;
$service_id = $_POST['service_id'] ?? null;
$technician_id = $_POST['technician_id'] ?? '';
$scheduled_date = $_POST['scheduled_date'] ?? '';
$scheduled_time = $_POST['scheduled_time'] ?? '';
$rejection_reason = $_POST['rejection_reason'] ?? '';
$admin_notes = $_POST['admin_notes'] ?? '';

// Validate parameters
if (!$action || !$service_id || !in_array($action, ['approve', 'reject', 'assign'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid parameters']);
    exit();
}

// Validate action-specific parameters
if ($action === 'reject' && empty($rejection_reason)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Rejection reason is required']);
    exit();
}

if ($action === 'assign' && empty($technician_id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Technician must be assigned']);
    exit();
}

// Get database connection
require_once '../../config/Database.php';

try {
    $db = new Database();
    $conn = $db->connect();

    // Begin transaction
    $conn->begin_transaction();

    // Get current service status
    $checkStmt = $conn->prepare("SELECT * FROM service_requests WHERE request_id = ?");
    $checkStmt->bind_param("s", $service_id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('Service request not found');
    }

    $service = $result->fetch_assoc();
    $currentAdminStatus = $service['admin_status'] ?? 'pending_approval';

    if ($action === 'approve') {
        // Validate status
        if ($currentAdminStatus !== 'pending_approval') {
            throw new Exception('Only pending service requests can be approved');
        }

        $newStatus = 'approved';
        $updateStmt = $conn->prepare("
            UPDATE service_requests 
            SET admin_status = ?, 
                approved_by = ?, 
                approved_at = NOW()
            WHERE request_id = ?
        ");
        $updateStmt->bind_param("sss", $newStatus, $_SESSION['user_id'], $service_id);
        $historyAction = 'approved';
        $historyReason = $admin_notes ?: 'Approved by admin';

    } else if ($action === 'reject') {
        // Validate status
        if ($currentAdminStatus !== 'pending_approval') {
            throw new Exception('Only pending service requests can be rejected');
        }

        $newStatus = 'rejected';
        $updateStmt = $conn->prepare("
            UPDATE service_requests 
            SET admin_status = ?, 
                rejection_reason = ?, 
                rejected_by = ?, 
                rejected_at = NOW()
            WHERE request_id = ?
        ");
        $updateStmt->bind_param("ssss", $newStatus, $rejection_reason, $_SESSION['user_id'], $service_id);
        $historyAction = 'rejected';
        $historyReason = $rejection_reason;

    } else if ($action === 'assign') {
        // Validate technician exists
        $techStmt = $conn->prepare("SELECT name FROM technicians WHERE technician_id = ?");
        $techStmt->bind_param("s", $technician_id);
        $techStmt->execute();
        $techResult = $techStmt->get_result();

        if ($techResult->num_rows === 0) {
            throw new Exception('Technician not found');
        }

        $tech = $techResult->fetch_assoc();
        $technician_name = $tech['name'];

        $newStatus = 'scheduled';
        $updateStmt = $conn->prepare("
            UPDATE service_requests 
            SET admin_status = ?, 
                technician_id = ?, 
                technician_name = ?, 
                scheduled_date = ?, 
                scheduled_time = ?, 
                assigned_at = NOW()
            WHERE request_id = ?
        ");
        $updateStmt->bind_param(
            "ssssss",
            $newStatus,
            $technician_id,
            $technician_name,
            $scheduled_date,
            $scheduled_time,
            $service_id
        );
        $historyAction = 'assigned';
        $historyReason = "Assigned to technician: $technician_name on $scheduled_date at $scheduled_time";
    }

    if (!$updateStmt->execute()) {
        throw new Exception('Failed to update service: ' . $updateStmt->error);
    }

    // Log to approval history
    $historyId = uniqid('history_');
    $historyStmt = $conn->prepare("
        INSERT INTO approval_history 
        (id, request_type, request_id, user_id, admin_id, action, reason, notes)
        VALUES (?, 'service', ?, ?, ?, ?, ?, ?)
    ");
    $historyStmt->bind_param(
        "sssssss",
        $historyId,
        $service_id,
        $service['user_id'] ?? 'unknown',
        $_SESSION['user_id'],
        $historyAction,
        $historyReason,
        $admin_notes
    );

    if (!$historyStmt->execute()) {
        throw new Exception('Failed to log approval history: ' . $historyStmt->error);
    }

    // Commit transaction
    $conn->commit();

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => ucfirst($action) . 'd successfully',
        'service_id' => $service_id,
        'new_status' => $newStatus
    ]);

} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
