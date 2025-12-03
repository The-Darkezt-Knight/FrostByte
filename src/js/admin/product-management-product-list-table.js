$(document).ready(function()
{
    let product_table = $("#product-list").DataTable({
        paging: false,
        searching: false,
        destroy: true
    });

    // Fetch products from the database
    $.ajax({
        url: '../PHP/api/get_products.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Clear existing data
            product_table.clear();

            // Add new data to the table
            if (data && data.length > 0) {
                data.forEach(function(product) {
                    product_table.row.add([
                        product.product_id || '',
                        product.product_name || '',
                        product.category || '',
                        product.price || '',
                        product.quantity || '',
                        product.status || ''
                    ]);
                });
            }
            product_table.draw();
        },
        error: function(error) {
            console.error('Error fetching products:', error);
        }
    });
})
