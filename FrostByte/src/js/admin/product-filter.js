let filteredData = [];

$(document).ready(function() {
    // Handle category filter
    $('#type').on('change', function() {
        applyFilters();
    });

    // Handle status filter
    $('#status').on('change', function() {
        applyFilters();
    });
});

function applyFilters() {
    const categoryFilter = $('#type').val();
    const statusFilter = $('#status').val();

    if (!product_table) return;

    // Get all data from the table
    const allData = product_table.data().toArray();

    // Filter based on selected options
    let filtered = allData.filter(row => {
        const category = row[2]; // Category is at index 2
        const status = row[5];   // Status is at index 5

        // Check category filter
        const categoryMatch = categoryFilter === 'allRoles' || category === getCategoryName(categoryFilter);

        // Check status filter
        const statusMatch = statusFilter === 'allStatus' || status === getStatusName(statusFilter);

        return categoryMatch && statusMatch;
    });

    // Clear and redraw table with filtered data
    product_table.clear();
    
    filtered.forEach(function(row) {
        product_table.row.add(row);
    });
    
    product_table.draw();
}

function getCategoryName(filterValue) {
    const categoryMap = {
        'superadmin': 'Processor',
        'admin': 'Keyboards',
        'technician': 'Mouse',
        'user': 'Monitor'
    };
    return categoryMap[filterValue] || '';
}

function getStatusName(filterValue) {
    const statusMap = {
        'active': 'active',
        'suspended': 'out of stock'
    };
    return statusMap[filterValue] || '';
}
