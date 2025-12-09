$(document).ready(function(){
    let order_table = $("#product-order-list").DataTable({
        paging: false,
        searching: true,
        destroy: true,
        dom: 'rt'  // Remove the search box from DataTables (only show table content)
    });

    // Fetch orders from the database
    $.ajax({
        url: '../PHP/api/get_orders.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Clear existing data
            order_table.clear();

            // Add new data to the table
            if (data && data.length > 0) {
                data.forEach(function(order) {
                    order_table.row.add([
                        order.order_id || '',
                        order.customer || '',
                        order.product || '',
                        order.amount || '',
                        order.status || '',
                        order.date || ''
                    ]);
                });
            }
            order_table.draw();
        },
        error: function(error) {
            console.error('Error fetching orders:', error);
        }
    });

    // Enable search functionality with the nav search input
    $('#order-management input[type="search"]').on('keyup', function() {
        order_table.search(this.value).draw();
    });
})