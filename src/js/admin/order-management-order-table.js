$(document).ready(function(){
    let order_table = $("#product-order-list").DataTable({
        paging: false,
        searching: false,
        destroy: true
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
})