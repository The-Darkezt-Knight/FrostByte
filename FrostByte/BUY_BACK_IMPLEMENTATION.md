# Buy Back Management System - Implementation Summary

## Overview
A complete Buy Back management system has been added to the FrostByte admin panel. This allows technicians/admins to review customer buyback requests and approve them with pricing offers.

---

## Database

### New Table: `buyback_requests`

**Location:** `src/sql/buyback_requests.sql`

**Fields:**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `request_id` (VARCHAR(20), UNIQUE) - Formatted ID like BR-2847
- `customer_id` (INT, FOREIGN KEY) - Links to users table
- `customer_name` (VARCHAR(100))
- `customer_email` (VARCHAR(100))
- `component_name` (VARCHAR(255)) - Name of the component being sold
- `component_category` (VARCHAR(100)) - Category (GPU, CPU, RAM, etc.)
- `condition` (VARCHAR(50)) - Excellent/Good/Fair/Poor
- `user_expected_price` (DECIMAL(10,2)) - What customer expects
- `our_offer_price` (DECIMAL(10,2)) - Price offered by admin
- `status` (ENUM) - Pending Review / Offer Sent / Negotiating / Accepted / Rejected / Completed
- `offer_message` (LONGTEXT) - Custom message to customer
- `notes` (LONGTEXT) - Internal notes
- `submitted_date` (TIMESTAMP) - When customer submitted
- `updated_date` (TIMESTAMP) - Last update time
- `approved_by` (INT) - User ID who approved
- `approved_date` (DATETIME) - When approved
- Indexes on: status, customer_id, submitted_date

**Run this SQL query to create the table:**
```sql
CREATE TABLE buyback_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    component_category VARCHAR(100),
    condition VARCHAR(50) NOT NULL,
    user_expected_price DECIMAL(10, 2) NOT NULL,
    our_offer_price DECIMAL(10, 2),
    status ENUM('Pending Review', 'Offer Sent', 'Negotiating', 'Accepted', 'Rejected', 'Completed') DEFAULT 'Pending Review',
    offer_message LONGTEXT,
    notes LONGTEXT,
    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_by INT,
    approved_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_customer_id (customer_id),
    INDEX idx_submitted_date (submitted_date),
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Sample data is included in the SQL file.

---

## Frontend Components

### 1. Menu Item
**File:** `src/PHP/admin.php`
- Added "Buy Back" menu in sidebar below "Technician Schedule"
- Icon: `fa-tag` (blue color)
- Subheader: "Manage customer buyback requests"

### 2. Main Page Section
**File:** `src/PHP/admin.php`
- New content section with ID `buyback`
- Includes:
  - Header with title and description
  - Statistics cards (Pending Review, Offer Sent, Accepted, Rejected)
  - Filter section (by status, condition, search by name/component)
  - Data table with request details
  - Detail modal for viewing and approving requests

### 3. Styling
**File:** `src/css/admin/buyback-management.css`
- Modern dark theme matching admin design
- Responsive grid layout
- Status and condition badges with color coding
- Modal for detailed review
- Hover effects and transitions

**Status Colors:**
- Pending Review: Yellow
- Offer Sent: Blue
- Negotiating: Blue
- Accepted: Green
- Rejected: Red

**Condition Colors:**
- Excellent: Green
- Good: Blue
- Fair: Yellow
- Poor: Red

### 4. JavaScript Functionality
**File:** `src/js/admin/buyback-management.js`

**Features:**
- Load all buyback requests from API
- Display requests in table format
- Filter by status, condition, or search term
- Update statistics cards in real-time
- Open detail modal with request information
- Edit offer price and message in modal
- Approve request (sends offer to customer)
- Reject request (requires confirmation)
- Date formatting for submissions

**Functions:**
- `loadBuybackRequests()` - Fetch all requests from API
- `displayBuybackRequests(requests)` - Render table
- `filterBuybackRequests()` - Apply filters
- `openBuybackModal(requestId)` - Show detail modal
- `closeBuybackModal()` - Hide detail modal
- `approveBuybackRequest()` - Submit approval with offer price
- `rejectBuybackRequest()` - Reject the request
- `updateBuybackStats()` - Update stat cards
- `formatDate(dateString)` - Format dates

---

## Backend API Endpoints

### 1. Get All Buyback Requests
**File:** `src/PHP/api/get_buyback_requests.php`
**Method:** GET
**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "request_id": "BR-2847",
            "customer_name": "Mark Johnson",
            "customer_email": "mark@email.com",
            "component_name": "NVIDIA RTX 3090",
            "component_category": "Graphics Card",
            "condition": "Excellent",
            "user_expected_price": "900.00",
            "our_offer_price": null,
            "status": "Pending Review",
            "submitted_date": "2025-12-09 10:30:00",
            ...
        }
    ],
    "total": 5
}
```

### 2. Approve Buyback Request
**File:** `src/PHP/api/approve_buyback_request.php`
**Method:** POST
**Request Body:**
```json
{
    "request_id": 1,
    "offer_price": 850.00,
    "offer_message": "Great condition! We'd like to buy it.",
    "status": "Offer Sent"
}
```
**Updates:**
- Sets our_offer_price
- Updates status
- Saves offer_message
- Records approved_by (current user)
- Sets approved_date timestamp

### 3. Reject Buyback Request
**File:** `src/PHP/api/reject_buyback_request.php`
**Method:** POST
**Request Body:**
```json
{
    "request_id": 1
}
```
**Updates:**
- Sets status to "Rejected"
- Records approved_by (current user)
- Sets approved_date timestamp

---

## Modified Files

### 1. `src/PHP/admin.php`
- Added menu button for Buy Back
- Added buyback content section
- Added detail modal HTML
- Linked CSS file: `buyback-management.css`
- Linked JS file: `buyback-management.js`

### 2. `src/js/admin/admin-panel.js`
- Added buyback section reference
- Added buyback button click handler
- Updated visibility logic to include buyback section

### 3. `src/css/admin/admin.css`
- Added #buyback styling rules
- Set display: none and flex-direction: column
- Added to scrollbar rule

---

## How to Use

### For Admins/Technicians:

1. **Navigate to Buy Back**
   - Click "Buy Back" in the sidebar
   - The page loads all customer buyback requests

2. **View Statistics**
   - 4 stat cards show counts for each status
   - Updates in real-time as you approve/reject requests

3. **Filter Requests**
   - Filter by Status (Pending Review, Offer Sent, etc.)
   - Filter by Condition (Excellent, Good, Fair, Poor)
   - Search by customer name or component name

4. **Review Request Details**
   - Click "Review" button on any row
   - Modal opens with complete request information
   - See customer info, component details, expected price

5. **Make an Offer**
   - In modal, enter "Our Offer Price"
   - Optionally add "Offer Message" for customer
   - Click "Approve & Send Offer" to save and send to customer
   - Status changes to "Offer Sent"

6. **Reject Request**
   - Click "Reject Request" button
   - Confirmation dialog appears
   - Status changes to "Rejected"

---

## Data Flow

```
Customer submits buyback request 
    ↓
Request stored in buyback_requests table
    ↓
Admin views requests in Buy Back section
    ↓
Admin reviews details in modal
    ↓
Admin either approves (with offer price) or rejects
    ↓
Request status updated
    ↓
Customer notified (in customer app)
```

---

## Integration Points

### For Customer Submission
You'll need to create a customer-facing form that:
1. Collects component info, condition, expected price
2. Inserts into buyback_requests table with status "Pending Review"
3. Generates unique request_id

### For Status Updates
When customer accepts/rejects the offer:
1. Update buyback_requests status to "Accepted" or "Rejected"
2. Trigger payment/pickup workflow

---

## Security Features

- All endpoints require authentication (session check)
- User ID tracked for approvals (approved_by field)
- Timestamps recorded for all actions
- Foreign key constraint on customer_id

---

## Future Enhancements

1. Customer notifications when offer is sent
2. Automated pickup scheduling after acceptance
3. Payment processing integration
4. Image uploads for component condition verification
5. Price comparison with market values
6. Bulk offer generation
7. Customer dashboard to view offer status
8. Payment tracking and history

---

## Testing

**To test the Buy Back system:**

1. Run the SQL query from `src/sql/buyback_requests.sql`
2. Log in to admin panel
3. Click "Buy Back" menu
4. Requests will display with sample data
5. Click "Review" on any request
6. Fill in offer price and submit
7. Request status should update to "Offer Sent"

---

## File Summary

| File | Type | Purpose |
|------|------|---------|
| `src/sql/buyback_requests.sql` | SQL | Database table definition |
| `src/PHP/admin.php` | HTML | Updated with menu and section |
| `src/js/admin/admin-panel.js` | JavaScript | Updated with buyback navigation |
| `src/js/admin/buyback-management.js` | JavaScript | Core functionality |
| `src/css/admin/buyback-management.css` | CSS | Styling |
| `src/css/admin/admin.css` | CSS | Updated with buyback rules |
| `src/PHP/api/get_buyback_requests.php` | PHP | Fetch requests |
| `src/PHP/api/approve_buyback_request.php` | PHP | Approve with offer |
| `src/PHP/api/reject_buyback_request.php` | PHP | Reject request |

---

## Next Steps

1. **Create the SQL table** by running the query from `src/sql/buyback_requests.sql`
2. **Test the interface** by clicking the Buy Back menu
3. **Create customer submission form** to populate the table
4. **Set up notifications** to alert customers when offers are sent
5. **Integrate with payment system** for accepted buybacks
