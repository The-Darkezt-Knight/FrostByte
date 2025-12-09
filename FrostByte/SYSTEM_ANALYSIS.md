# FrostByte Application Structure Analysis

## Executive Summary
This document provides a comprehensive analysis of the FrostByte application's current architecture, including order management, service request systems, and sell parts functionality.

---

## 1. CURRENT ADMIN PANEL STRUCTURE

### Admin Panel Pages & Navigation
**Location:** `src/PHP/admin.php`

**Current Sections:**
1. **Overview Dashboard**
   - Total orders card
   - Products card
   - Revenue card
   - Pending tasks card
   - Order list table

2. **Product Management** (with submenu)
   - Products list
   - Categories & Brands
   - Stock Management
   - Used Components

3. **Order Management**
   - Stats cards: Total Orders, Pending Payment, Processing, Shipped, Delivered
   - Filter section: Search, Status, Payment method, Sort options
   - Orders table with columns: Order ID, Customer, Items, Total, Payment, Status, Date, Actions
   - Order Details Modal (view order information)
   - Approve Order functionality

4. **Technician Schedule**
   - List/Calendar view toggle
   - Stats cards: Total Requests, Pending, Scheduled, In Progress, Completed
   - Filter section: Status, Service Type, Technician, Priority
   - Services table
   - Assignment Modal for assigning technicians

### Admin JavaScript Files
**Location:** `src/js/admin/`
- `admin-panel.js` - Main navigation and page switching logic
- `order-management.js` - Order table population, filtering, and modal handling
- `overview_order_list_table.js` - Overview dashboard table
- `product-management-product-list-table.js` - Product listing
- `product-management-add-product.js` - Add product form
- `product-filter.js` - Product filtering
- `create-task.js` - Task creation
- `technician-schedule-management.js` - Schedule management
- `technician-schedule.js` - Schedule view

---

## 2. CURRENT ORDER MANAGEMENT SYSTEM

### Database Structure
**Table:** `orders`
```sql
CREATE TABLE `orders` (
  order_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50),
  customer VARCHAR(100),
  product VARCHAR(255),
  product_id VARCHAR(50),
  amount DECIMAL(10,2),
  quantity INT DEFAULT 1,
  status ENUM('pending','processing','shipped','delivered','cancelled','refunded'),
  payment_method VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(100),
  company_name VARCHAR(100),
  payment_status VARCHAR(50),
  shipping_address TEXT,
  date TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
)
```

### Order Status Workflow
**Current statuses:** pending → processing → shipped → delivered (or cancelled/refunded)

### Existing Order API Endpoints
**Location:** `src/PHP/api/`

1. **`get_admin_orders.php`**
   - Returns all orders with customer info
   - Joins with users table
   - Returns stats about order statuses
   - Limited to 100 orders

2. **`approve_order.php`** ⭐ APPROVAL MECHANISM
   - Requires admin role
   - Accepts POST request with order_id
   - Updates order status from pending to processing
   - Returns updated stats
   - Uses transactions
   - Checks: User authentication, Admin role verification

3. **`get_order_details.php`**
   - Fetches specific order details

4. **`get_orders.php`**
   - Customer endpoint for their own orders

5. **`create_order.php`**
   - Creates new orders

### Current Approval/Rejection Mechanism
✅ **EXISTS for Orders:**
- **Approval:** Order moved from "pending" → "processing" via `approve_order.php`
- **Rejection:** No explicit rejection endpoint exists
- **Status update:** Admin can click "Approve Order" button in modal
- **Transaction support:** Yes, uses mysqli transactions
- **Validation:** Role-based (admin only)

---

## 3. CURRENT SERVICE REQUEST SYSTEM

### Database Structure
**Table:** `service_requests`
```sql
CREATE TABLE `service_requests` (
  request_id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50),
  service_type VARCHAR(100),
  description TEXT,
  priority ENUM('Low','Medium','High','Critical'),
  status ENUM('Pending','Scheduled','In Progress','Completed','Cancelled'),
  location VARCHAR(255),
  preferred_date DATE,
  preferred_time TIME,
  assigned_technician_id VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(user_id),
  FOREIGN KEY (assigned_technician_id) REFERENCES users(user_id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_assigned_technician_id (assigned_technician_id),
  INDEX idx_status (status),
  INDEX idx_priority (priority)
)
```

**Table:** `service_request_history`
```sql
CREATE TABLE `service_request_history` (
  history_id VARCHAR(50) PRIMARY KEY,
  request_id VARCHAR(50),
  old_status VARCHAR(50),
  new_status VARCHAR(50),
  changed_by VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES service_requests(request_id),
  FOREIGN KEY (changed_by) REFERENCES users(user_id)
)
```

### Service Request Status Workflow
**Current statuses:** Pending → Scheduled → In Progress → Completed (or Cancelled)

### Existing Service Request API Endpoints

1. **`get_service_requests.php`**
   - Fetches service requests for a customer
   - Can fetch specific request by request_id
   - Returns all request details
   - Customer-scoped (customer_id from session)

2. **`create_service_request.php`**
   - Creates new service requests
   - Validates input
   - Returns success/failure

3. **`cancel_service_request.php`** ⭐ CANCELLATION MECHANISM
   - Requires customer authentication
   - Accepts POST request with request_id
   - Updates status to 'Cancelled'
   - Uses transactions
   - Validation: Ownership verification (customer_id matching)

4. **`assign_technician.php`**
   - Assigns technician to service request
   - Updates assigned_technician_id field

### Current Approval/Rejection Mechanism for Services
❌ **DOES NOT EXIST for Service Requests:**
- No approval endpoint for service requests from admin
- No rejection mechanism
- Only cancellation available (customer-initiated)
- No admin review/approval workflow
- Status changes directly from customer creation

---

## 4. CURRENT SELL PARTS SYSTEM

### Database Structure
**Table:** `sell_parts_requests`
```sql
CREATE TABLE IF NOT EXISTS sell_parts_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id VARCHAR(50) UNIQUE,
  user_id VARCHAR(50),
  customer_name VARCHAR(100),
  part_name VARCHAR(150),
  category VARCHAR(50),
  condition VARCHAR(30),
  price DECIMAL(10, 2),
  quantity INT DEFAULT 1,
  description LONGTEXT,
  contact_phone VARCHAR(20),
  image_path_1 VARCHAR(255),
  image_path_2 VARCHAR(255),
  image_path_3 VARCHAR(255),
  image_path_4 VARCHAR(255),
  status ENUM('pending','processing','approved','rejected'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
)
```

### Sell Parts Status Workflow
**Current statuses:** pending → processing → approved (or rejected)

### Existing Sell Parts API Endpoints

1. **`get_sell_parts.php`**
   - Fetches sell parts requests for a user
   - Returns all request details including image paths
   - User-scoped (user_id from session or parameter)
   - Returns: request_id, part_name, category, condition, price, quantity, status, etc.

2. **`create_sell_part.php`**
   - Creates new sell part requests
   - Accepts: part_name, category, condition, price, quantity, description, contact_phone, images
   - Image handling with multiple image paths

3. **`archive_sell_part.php`**
   - Archives completed sell part requests

### Current Approval/Rejection Mechanism for Sell Parts
⚠️ **PARTIALLY COMPLETE:**
- **Database support:** Yes - status ENUM includes 'approved' and 'rejected'
- **Admin interface:** Likely missing (no sell parts section in admin.php)
- **API endpoints:** No approval/rejection endpoints found in `src/PHP/api/`
- **Workflow:** Not fully implemented in UI

---

## 5. CURRENT DATABASE TABLES OVERVIEW

### Core Tables

| Table | Purpose | Status | Approval/Rejection |
|-------|---------|--------|-------------------|
| `orders` | Customer product orders | ✅ Complete | ✅ Partial (approve only) |
| `service_requests` | Service booking requests | ✅ Complete | ❌ Not implemented |
| `service_request_history` | Audit trail for service requests | ✅ Complete | N/A |
| `sell_parts_requests` | Customer selling parts requests | ✅ Complete | ⚠️ DB ready, UI missing |
| `users` | User accounts (roles: superadmin, admin, technician, user) | ✅ Complete | N/A |
| `products` | Product catalog | ✅ Complete | N/A |
| `technician_schedule` | Technician appointment scheduling | ✅ Complete | N/A |

### Status Fields in Database
- **orders.status:** pending, processing, shipped, delivered, cancelled, refunded
- **service_requests.status:** Pending, Scheduled, In Progress, Completed, Cancelled
- **sell_parts_requests.status:** pending, processing, approved, rejected

---

## 6. CURRENT WORKFLOW COMPARISON

### Order Workflow
```
Current: pending → (approve) → processing → shipped → delivered
Desired: pending → (admin review) → approved/rejected → processing → shipped → delivered
```

### Service Request Workflow
```
Current: Pending → Scheduled → In Progress → Completed (or customer cancels)
Desired: Pending → (admin review) → Approved/Rejected → Scheduled → In Progress → Completed
```

### Sell Parts Workflow
```
Current: pending → (manual status change) → processing → approved/rejected
Desired: pending → (admin review & approval) → processing → approved/rejected
```

---

## 7. WHAT ALREADY EXISTS ✅

### Approval/Rejection Features
1. **Order Approval:**
   - ✅ `approve_order.php` API endpoint exists
   - ✅ Admin button in modal: "Approve Order"
   - ✅ Status update logic (pending → processing)
   - ✅ Transaction support
   - ❌ No rejection endpoint
   - ❌ No approval history tracking

2. **Service Request Cancellation:**
   - ✅ `cancel_service_request.php` endpoint
   - ✅ Customer can initiate
   - ✅ Status update to 'Cancelled'
   - ❌ No admin approval/rejection

3. **Sell Parts Database:**
   - ✅ Status field supports approved/rejected
   - ✅ Created/updated timestamps
   - ✅ Image storage paths
   - ❌ No admin interface
   - ❌ No approval/rejection endpoints

### Admin UI Sections
- ✅ Order Management (view, filter, approve)
- ✅ Technician Schedule (assign technicians)
- ✅ Product Management
- ✅ Overview Dashboard
- ❌ Service Request Management (no admin section)
- ❌ Sell Parts Management (no admin section)

---

## 8. WHAT NEEDS TO BE BUILT 🔨

### 1. **Service Request Management Admin Section**
   - Admin dashboard page for service requests
   - Approval/rejection workflow
   - View pending requests
   - Approve/Reject/Cancel actions
   - Assignment to technicians
   - Status history tracking

### 2. **Sell Parts Management Admin Section**
   - Admin dashboard page for sell parts requests
   - Approval/rejection interface
   - View pending requests with images
   - Approve/Reject actions
   - Customer notifications

### 3. **Approval/Rejection API Endpoints**
   Required endpoints:
   - `approve_service_request.php`
   - `reject_service_request.php`
   - `approve_sell_part.php`
   - `reject_sell_part.php`

### 4. **Request History/Audit Trail**
   - Service request history already has table
   - Need to implement tracking on updates
   - Add approval/rejection reasons

### 5. **Notification System**
   - Customer notifications on approval/rejection
   - Email/in-app notifications

### 6. **Enhanced Order Rejection**
   - `reject_order.php` endpoint
   - Reason/notes field
   - Customer notification

---

## 9. DATABASE RELATIONSHIPS

### User Relationships
```
users (PK: user_id)
├── orders (FK: user_id)
├── service_requests (FK: customer_id)
├── sell_parts_requests (FK: user_id)
├── technician_schedule (FK: technician_id)
└── service_request_history (FK: changed_by)
```

### Cross-Table Relationships
```
service_requests
├── FK: customer_id → users.user_id
├── FK: assigned_technician_id → users.user_id
└── service_request_history
    ├── FK: request_id → service_requests.request_id
    └── FK: changed_by → users.user_id

orders
├── FK: user_id → users.user_id
└── FK: product_id → products.product_id

technician_schedule
├── FK: technician_id → users.user_id
└── FK: order_id → orders.order_id
```

---

## 10. IMPLEMENTATION PRIORITIES

### Phase 1: Service Request Management (HIGHEST)
1. Create admin UI page for service requests
2. Create approval/rejection endpoints
3. Implement status tracking
4. Add technician assignment in approval flow

### Phase 2: Sell Parts Management (HIGH)
1. Create admin UI page for sell parts
2. Create approval/rejection endpoints
3. Implement image preview
4. Customer notification system

### Phase 3: Order Enhancement (MEDIUM)
1. Add rejection endpoint
2. Add reason/notes field
3. Implement approval history
4. Customer notifications

### Phase 4: Audit & History (LOW)
1. Enhance service_request_history usage
2. Create audit trail for all approvals
3. Add approval reason tracking

---

## 11. KEY FINDINGS

### Strengths ✅
- Database schema is well-designed with proper foreign keys
- Transaction support exists
- Role-based access control in place
- Timestamp tracking (created_at, updated_at)
- History table available for service requests

### Gaps ❌
- Incomplete approval/rejection workflow for service requests
- No approval/rejection for sell parts (UI missing)
- Limited order rejection mechanism
- No comprehensive audit trail
- No admin notification system
- Service requests lack approval workflow in UI

### Quick Wins 🚀
- Approval endpoints are mostly straightforward (follows approve_order.php pattern)
- Database already supports status values
- Can leverage existing transaction patterns
- Can reuse modal/UI patterns from order management

---

## File Structure Reference

### Core Admin Files
- **Main:** `src/PHP/admin.php` (590 lines)
- **JS:** `src/js/admin/*.js`
- **CSS:** `src/css/admin/*`

### API Endpoints
- **Location:** `src/PHP/api/`
- **Pattern:** Individual PHP files for each operation
- **Auth:** Session-based with role checking

### Database
- **Main schema:** `src/sql/frostbyte.sql`
- **Sell parts:** `sell_parts_table.sql`
- **Connection:** `src/PHP/db_connect.php`

