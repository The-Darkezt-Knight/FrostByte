<?php
/**
 * API Endpoint: Manage Sell Parts Requests (Quality Check/Offer Price)
 * Path: /FrostByte/src/PHP/api/manage_sell_part.php
 * Methods: POST (approve/offer/reject)
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
$sell_part_id = $_POST['sell_part_id'] ?? null;
$offer_price = $_POST['offer_price'] ?? '';
$quality_check_notes = $_POST['quality_check_notes'] ?? '';
$admin_evaluation = $_POST['admin_evaluation'] ?? '';
$rejection_reason = $_POST['rejection_reason'] ?? '';

// Validate parameters
if (!$action || !$sell_part_id || !in_array($action, ['approve', 'offer', 'reject'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid parameters']);
    exit();
}

// Validate action-specific parameters
if ($action === 'offer' && (empty($offer_price) || !is_numeric($offer_price))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Valid offer price is required']);
    exit();
}

if ($action === 'reject' && empty($rejection_reason)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Rejection reason is required']);
    exit();
}

// Get database connection
require_once '../../config/Database.php';

try {
    $db = new Database();
    $conn = $db->connect();

    // Begin transaction
    $conn->begin_transaction();

    // Get current sell part status
    $checkStmt = $conn->prepare("SELECT * FROM sell_parts_requests WHERE request_id = ?");
    $checkStmt->bind_param("s", $sell_part_id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('Sell part request not found');
    }

    $sellPart = $result->fetch_assoc();
    $currentStatus = $sellPart['status'];

    if ($action === 'approve') {
        // Validate status
        if ($currentStatus !== 'pending') {
            throw new Exception('Only pending requests can be approved');
        }

        $newStatus = 'processing';
        $updateStmt = $conn->prepare("
            UPDATE sell_parts_requests 
            SET status = ?, 
                admin_evaluation = ?, 
                quality_check_date = CURDATE(),
                quality_check_notes = ?,
                approved_by = ?, 
                approved_at = NOW()
            WHERE request_id = ?
        ");
        $updateStmt->bind_param("sssss", $newStatus, $admin_evaluation, $quality_check_notes, $_SESSION['user_id'], $sell_part_id);
        $historyAction = 'approved';
        $historyReason = $admin_evaluation ?: 'Approved for further processing';

    } else if ($action === 'offer') {
        // Validate status - can offer after approval/processing
        if (!in_array($currentStatus, ['processing', 'approved'])) {
            throw new Exception('Item must be in processing or approved status to make offer');
        }

        $newStatus = 'offered';
        $offer_price = (float)$offer_price;
        $updateStmt = $conn->prepare("
            UPDATE sell_parts_requests 
            SET status = ?, 
                offer_price = ?, 
                offered_at = NOW()
            WHERE request_id = ?
        ");
        $updateStmt->bind_param("dss", $offer_price, $sell_part_id);
        
        // Also create offer record
        $offerStmt = $conn->prepare("
            INSERT INTO offers 
            (offer_id, sell_part_request_id, user_id, offer_price, admin_notes, status, expires_at)
            VALUES (?, ?, ?, ?, ?, 'pending', DATE_ADD(NOW(), INTERVAL 7 DAY))
        ");
        
        $offerId = uniqid('offer_');
        $offerStatus = 'pending';
        $offerStmt->bind_param(
            "sssds",
            $offerId,
            $sell_part_id,
            $sellPart['user_id'],
            $offer_price,
            $quality_check_notes
        );

        if (!$offerStmt->execute()) {
            throw new Exception('Failed to create offer: ' . $offerStmt->error);
        }

        $historyAction = 'modified';
        $historyReason = "Offer created: PKR " . number_format($offer_price, 2);

    } else if ($action === 'reject') {
        // Validate status
        if ($currentStatus !== 'pending' && $currentStatus !== 'processing') {
            throw new Exception('Only pending or processing requests can be rejected');
        }

        $newStatus = 'rejected';
        $updateStmt = $conn->prepare("
            UPDATE sell_parts_requests 
            SET status = ?, 
                admin_evaluation = ?, 
                approved_by = ?, 
                approved_at = NOW()
            WHERE request_id = ?
        ");
        $updateStmt->bind_param("ssss", $newStatus, $rejection_reason, $_SESSION['user_id'], $sell_part_id);
        $historyAction = 'rejected';
        $historyReason = $rejection_reason;
    }

    if (!$updateStmt->execute()) {
        throw new Exception('Failed to update sell part: ' . $updateStmt->error);
    }

    // Log to approval history
    $historyId = uniqid('history_');
    $historyStmt = $conn->prepare("
        INSERT INTO approval_history 
        (id, request_type, request_id, user_id, admin_id, action, reason, notes)
        VALUES (?, 'sell_part', ?, ?, ?, ?, ?, ?)
    ");
    $historyStmt->bind_param(
        "sssssss",
        $historyId,
        $sell_part_id,
        $sellPart['user_id'],
        $_SESSION['user_id'],
        $historyAction,
        $historyReason,
        $quality_check_notes
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
        'sell_part_id' => $sell_part_id,
        'new_status' => $newStatus,
        'offer_price' => $offer_price ?? null
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
