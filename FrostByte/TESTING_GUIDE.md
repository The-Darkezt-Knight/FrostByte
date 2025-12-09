# FrostByte Service Request System - Testing Guide

## ✅ What Has Been Fixed

### 1. Database Connection
- Created `db_connect.php` with proper MySQL connection
- All APIs now properly connected to the database
- Database tables created: `service_requests` and `service_request_history`

### 2. Service Request API Endpoints
All 5 APIs fixed and ready:
- ✅ `create_service_request.php` - POST to save bookings
- ✅ `get_service_requests.php` - GET to fetch all requests  
- ✅ `assign_technician.php` - POST to assign technician
- ✅ `get_technicians.php` - GET to list technicians
- ✅ `cancel_service_request.php` - POST to cancel bookings

### 3. Customer Booking System
- Updated `services-booking.js` to save bookings to database
- Improved error handling for API responses
- Service requests now load from database instead of localStorage

### 4. Admin Technician Assignment
- Redesigned modal with technician cards and status indicators
- Updated to display system design (light theme, blue accents)
- Interactive technician selection with visual feedback

---

## 🧪 Testing Steps

### Step 1: Verify Database Setup
Open in browser:
```
http://localhost/FrostByte/src/PHP/setup_service_tables.php
```
You should see:
```
✓ service_requests table created/verified
✓ service_request_history table created/verified
All tables created/verified successfully!
```

### Step 2: Login as Customer
1. Open: `http://localhost/FrostByte/src/PHP/index.php`
2. Login with test customer credentials
3. Redirect to Customer Dashboard

### Step 3: Book a Service
1. Click "Services" in the left sidebar
2. Click "Book New Service" button
3. Fill in the 4-step form:
   - **Step 1**: Select service type (e.g., "PC Assembly")
   - **Step 2**: Select date and time slot
   - **Step 3**: Enter address and phone number
   - **Step 4**: Agree to terms and confirm
4. Should see: ✅ "Service booking confirmed!"
5. New booking appears in "Your Service Requests" section with "Pending" status

### Step 4: Verify Admin Sees Request
1. Login as Admin: `http://localhost/FrostByte/src/PHP/admin.php`
2. Click "Technician Schedule" in left sidebar
3. Service request appears in the table with:
   - Customer name
   - Service type
   - Location
   - Preferred date/time
   - Status: "Pending"
   - "Assign" button

### Step 5: Assign Technician
1. In admin technician schedule, click "Assign" button for pending request
2. Modal opens showing:
   - Service Details (read-only)
   - Technician Cards with:
     - Technician avatar/initials
     - Name
     - Email
     - Active jobs count
     - Status badge (Available/Busy)
3. Click on technician card to select
4. (Optional) Add notes for technician
5. Click "Assign Technician" button
6. Modal closes, table updates with assigned technician
7. Status changes to "Scheduled"

### Step 6: Verify Customer Sees Update
1. Go back to Customer Dashboard
2. Refresh page or navigate to Services section
3. Service now shows:
   - Assigned technician name
   - Status: "Scheduled"

---

## 🔧 Troubleshooting

### Problem: "Unauthorized" error when booking
**Solution**: Make sure you're logged in. Check that `$_SESSION['user_id']` is set.

### Problem: "Invalid JSON response" error  
**Solution**: 
- Check browser console for exact error
- Visit: `http://localhost/FrostByte/src/PHP/test_get_requests.php` to verify API returns JSON
- Verify db_connect.php is present

### Problem: Service request not appearing in admin table
**Solution**:
- Refresh the admin page (F5)
- Check if API returns data: `http://localhost/FrostByte/src/PHP/test_get_requests.php`
- Verify customer_id in request matches current user

### Problem: Cannot select technician in modal
**Solution**:
- Check browser console for errors
- Verify technicians are being loaded: Look for console logs showing technician data
- Ensure you're logged in as admin

---

## 📊 API Response Format

### GET `/api/get_service_requests.php`
```json
{
  "success": true,
  "data": [
    {
      "request_id": 1,
      "customer": "John Doe",
      "service_type": "pc-assembly",
      "status": "Pending",
      "preferred_date": "2025-12-15",
      "preferred_time": "14:00:00",
      "location": "123 Main St",
      "assigned_technician_id": null,
      "technician": null,
      "created_at": "2025-12-08 10:30:00"
    }
  ]
}
```

### POST `/api/create_service_request.php`
**Request:**
```json
{
  "service_type": "pc-assembly",
  "description": "Build custom gaming PC",
  "location": "Home Address",
  "preferred_date": "2025-12-15",
  "preferred_time": "14:00",
  "priority": "Medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service request created successfully",
  "request_id": 1
}
```

---

## 📁 Key Files Modified

| File | Purpose |
|------|---------|
| `/src/PHP/db_connect.php` | Database connection (NEW) |
| `/src/PHP/api/create_service_request.php` | Create booking |
| `/src/PHP/api/get_service_requests.php` | List all requests |
| `/src/PHP/api/assign_technician.php` | Assign technician |
| `/src/PHP/api/get_technicians.php` | List technicians |
| `/src/PHP/api/cancel_service_request.php` | Cancel booking (NEW) |
| `/src/js/customer/services-booking.js` | Customer booking logic |
| `/src/js/admin/technician-schedule-management.js` | Admin management |
| `/src/css/admin/schedule-technician/technician-schedule.css` | Modal styling |
| `/src/PHP/admin.php` | Modal HTML updated |

---

## ✨ Features Implemented

✅ Customer booking form saves to database
✅ Admin sees all service requests in table
✅ Technician assignment modal with visual selection
✅ Service status tracking (Pending → Scheduled → In Progress → Completed)
✅ Technician availability indicators
✅ Priority-based sorting
✅ Job count tracking
✅ Request history logging
✅ Responsive design
✅ Error handling and validation

---

## 🚀 Next Steps

After testing is complete:
1. Test with multiple customers/bookings
2. Test technician assignment workflow
3. Test status updates and history
4. Test cancellation flow
5. Test edge cases and error scenarios
6. Deploy to production

