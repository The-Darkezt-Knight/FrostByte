# Buy Back Management - Quick Setup Guide

## ⚡ Quick Start

### Step 1: Create Database Table
Copy and run this SQL in your database:

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

### Step 2: All Files Already Created ✅
The following files have been created and configured:

- ✅ Menu item in admin sidebar
- ✅ CSS styling (`src/css/admin/buyback-management.css`)
- ✅ JavaScript functionality (`src/js/admin/buyback-management.js`)
- ✅ API endpoints for getting, approving, and rejecting requests
- ✅ Admin panel navigation updated

### Step 3: Access Buy Back Section
1. Log in to admin panel
2. Click "Buy Back" in sidebar (below Technician Schedule)
3. View dashboard with stats and requests

---

## 📋 Features Implemented

### Admin Dashboard
- **Statistics Cards**: Pending Review, Offer Sent, Accepted, Rejected counts
- **Filters**: By Status, Condition, or Search (customer name/component)
- **Data Table**: Shows all buyback requests with key info
- **Detail Modal**: Full request info and offer management

### Request Management
- **Review**: Click any request to see full details
- **Approve**: Set your offer price and send to customer
- **Reject**: Decline buyback requests with confirmation
- **Offer Message**: Add custom message to customers

### Status Tracking
- Pending Review (yellow)
- Offer Sent (blue)
- Negotiating (blue)
- Accepted (green)
- Rejected (red)

---

## 🔧 API Reference

### Get All Requests
```
GET /FrostByte/src/PHP/api/get_buyback_requests.php
Response: { success: true, data: [...], total: 5 }
```

### Approve Request
```
POST /FrostByte/src/PHP/api/approve_buyback_request.php
Body: {
    request_id: 1,
    offer_price: 850.00,
    offer_message: "Great condition!",
    status: "Offer Sent"
}
```

### Reject Request
```
POST /FrostByte/src/PHP/api/reject_buyback_request.php
Body: {
    request_id: 1
}
```

---

## 📁 File Structure

```
FrostByte/
├── src/
│   ├── PHP/
│   │   ├── admin.php (UPDATED - menu + section added)
│   │   ├── api/
│   │   │   ├── get_buyback_requests.php (NEW)
│   │   │   ├── approve_buyback_request.php (NEW)
│   │   │   └── reject_buyback_request.php (NEW)
│   │   └── db_connect.php (using existing)
│   ├── js/
│   │   └── admin/
│   │       ├── admin-panel.js (UPDATED - navigation added)
│   │       └── buyback-management.js (NEW)
│   ├── css/
│   │   └── admin/
│   │       ├── admin.css (UPDATED - buyback styles added)
│   │       └── buyback-management.css (NEW)
│   └── sql/
│       └── buyback_requests.sql (NEW - table definition)
└── BUY_BACK_IMPLEMENTATION.md (NEW - full documentation)
```

---

## 🧪 Testing

1. **Ensure database table is created**
2. **Log into admin panel**
3. **Click Buy Back menu** - you should see the dashboard
4. **Review a request** - click the Review button
5. **Approve request** - enter offer price and click "Approve & Send Offer"
6. **Check status** - request status should update to "Offer Sent"
7. **Reject request** - try rejecting a request to test rejection flow

---

## 📊 Sample Data

The SQL file includes sample buyback requests:
- BR-2847: NVIDIA RTX 3090 - Excellent - Pending Review
- BR-2846: AMD Ryzen 7 5800X - Good - Pending Review
- BR-2845: G.Skill 16GB DDR4 - Fair - Pending Review
- BR-2844: Samsung 860 EVO 500GB - Good - Accepted
- BR-2843: ASUS Prime B450M - Poor - Rejected

---

## 🔐 Security

✅ Session authentication required
✅ User ID tracked for all approvals
✅ Timestamps recorded for audit trail
✅ Input validation on offer prices
✅ Foreign key constraint on customers

---

## 📝 Next Steps

### Optional Enhancements:
1. Create customer submission form
2. Add email notifications
3. Integrate pickup scheduling
4. Add payment processing
5. Create customer dashboard
6. Add image uploads for conditions

---

## 🆘 Troubleshooting

**Q: Buy Back menu not showing?**
- Ensure admin.php was updated correctly
- Check browser console for JavaScript errors
- Verify CSS is loading

**Q: API returns empty data?**
- Run the SQL table creation script
- Check database connection
- Verify table name is correct

**Q: Approve/Reject not working?**
- Check if session is active (user logged in)
- Verify API files are in correct location
- Check browser console for network errors

---

## 📞 Support

For issues or questions, refer to:
- Full documentation: `BUY_BACK_IMPLEMENTATION.md`
- API endpoints: Check PHP files in `src/PHP/api/`
- Styling: `src/css/admin/buyback-management.css`
- Frontend logic: `src/js/admin/buyback-management.js`
