# Technician Buy Back Review - Required Information

## What Technicians Need to Review

Based on the `sell_parts_requests` table structure, here's what each technician needs to see when reviewing a product for buyback:

### 1. **Customer Information**
- **customer_name**: Who submitted the product
- **contact_phone**: How to reach them for questions/clarification

### 2. **Product Details**
- **part_name**: What component/part is being sold
- **category**: Category of the product (GPU, CPU, RAM, etc.)
- **condition**: Product condition (Excellent, Good, Fair, Poor)
- **quantity**: How many units they're selling
- **price**: Customer's asking price

### 3. **Product Description & Images**
- **description**: Detailed description of the product (usage, defects, history, etc.)
- **image_path_1 to image_path_4**: Up to 4 product photos for inspection

### 4. **Review & Decision**
- **status**: Current status (pending, approved, rejected)
- **created_at**: When the request was submitted

## Technician Workflow

1. **View Request**: See all pending requests in the Buy Back table
2. **Review Details**: Click "Review" to see full details in modal
3. **Inspect Images**: View product photos (4 images available)
4. **Read Description**: Understand product condition from detailed description
5. **Make Decision**:
   - **Approve**: Accept the product, set a price offer
   - **Reject**: Decline the request if product doesn't meet criteria
6. **Set Offer Price**: If approving, technician enters the buyback price (how much to pay customer)

## Current Implementation

### Table Structure
```
id                  - Auto-increment ID
request_id          - Unique request identifier (e.g., SR-12345)
user_id             - Customer user ID
customer_name       - Customer name
part_name           - Product name
category            - Product category
condition           - Product condition (Excellent/Good/Fair/Poor)
price               - Customer's asking price
quantity            - Number of units
description         - Detailed product description
contact_phone       - Customer phone for follow-up
image_path_1-4      - Paths to 4 product images
status              - pending/approved/rejected
created_at          - Submission timestamp
updated_at          - Last update timestamp
```

## Information Displayed in Buy Back Section

### Table View (Quick Overview)
- Request ID
- Customer name & phone
- Part name
- Condition (colored badge)
- Customer asking price
- Quantity
- Current status
- Submission date
- Review button

### Modal View (Detailed Review)
- Customer name & phone
- Part name
- Category
- Condition
- Customer asking price
- Offer price input (technician enters their offer)
- Product description (from customer)
- Status badge
- Image gallery (can be added)
- Approve/Reject buttons

## Next Enhancement Opportunities

1. **Image Gallery Modal**: Click to view full-size product photos
2. **Valuation Guide**: Show market value reference for products
3. **Notes Section**: Technician can add inspection notes
4. **Quick Pricing**: Suggest prices based on condition and category
5. **History**: Track all technician reviews and approvals
6. **Customer Contact**: Send approval/rejection messages automatically
