# FrostByte - Consolidated PHP Setup

## ✅ File Consolidation Complete

All main application files have been consolidated into the `/src/PHP/` folder with proper authentication and role-based routing.

### Main Entry Points

1. **index.php** (Login Page)
   - Entry point for all users
   - Form submission: Validates credentials via `/api/login.php`
   - Links to sign_up.php for new accounts
   - Redirect on success:
     - **SuperAdmin** → super_admin.php
     - **Admin** → admin.php
     - **Customer** → customer.php

2. **sign_up.php** (Registration Page)
   - Form submission: Creates user via `/api/signup.php`
   - Validates: Email uniqueness, password matching, required fields
   - Links back to index.php for login
   - Redirect on success → index.php (login page)

### Protected Dashboard Pages

3. **customer.php**
   - Protected by `session.js` (redirects to index.php if not logged in)
   - Requires role: 'user'
   - Features: Shop, Orders, Cart, Settings
   - Sign out link → index.php

4. **admin.php**
   - Protected by `session.js` (redirects to index.php if not logged in)
   - Requires role: 'admin'
   - Features: Overview, Product Management, Order Management, Technician Schedule
   - Sign out link → index.php

5. **super_admin.php**
   - Protected by `session.js` (redirects to index.php if not logged in)
   - Requires role: 'superadmin'
   - Features: User Management, Database Administration, System Monitoring, System Config
   - Sign out link → index.php

### API Endpoints (in /api/)

- `/api/signup.php` - User registration
- `/api/login.php` - User authentication
- `/api/check_session.php` - Session verification
- `/api/logout.php` - Session destruction
- `/api/create_order.php` - Create orders
- Plus all other business logic APIs

### Authentication Flow

```
User Visits index.php (Login)
    ↓
Enter Credentials
    ↓
Submit to /api/login.php
    ↓
Session Created with Role
    ↓
Redirect by Role:
├─ superadmin → super_admin.php
├─ admin → admin.php
└─ user → customer.php
    ↓
Protected Page loads session.js
    ↓
session.js verifies session via /api/check_session.php
    ↓
User can access page + user name displayed in header
```

### File Structure

```
/FrostByte/src/PHP/
├── index.php (Login)
├── sign_up.php (Registration)
├── customer.php (Customer Dashboard)
├── admin.php (Admin Dashboard)
├── super_admin.php (SuperAdmin Dashboard)
├── api/
│   ├── signup.php
│   ├── login.php
│   ├── check_session.php
│   ├── logout.php
│   ├── create_order.php
│   └── ... (other APIs)
├── test/
└── setup/
```

### JavaScript Protection

All dashboard pages include `session.js` which:
1. Checks if user session exists
2. Updates user name display: `#userNameDisplay`
3. Redirects to index.php if session invalid
4. Includes logout functionality

### How to Test

1. Navigate to: `http://localhost/FrostByte/src/PHP/index.php`
2. Sign up with new account (email must be unique)
3. Login with credentials
4. Verify redirect to correct dashboard based on role
5. View user name in dashboard header
6. Click "Sign out" to return to login

### Notes

- All HTML files have been converted to PHP extensions
- All sign-out links point to /PHP/index.php
- All JavaScript redirects point to /PHP/ folder
- Cart persists in localStorage
- User sessions stored server-side
- Password hashed with SHA256
- Email must be unique per user
