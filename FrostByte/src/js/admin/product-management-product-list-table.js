let product_table;

$(document).ready(function()
{
    fetch_product_data();

    // Handle refresh button click
    $('#refresh-product-table').on('click', function() {
        $(this).prop('disabled', true).css('opacity', '0.6');
        fetch_product_data();
    });

    // Enable search functionality with the nav search input
    $('#products input[type="search"]').on('keyup', function() {
        product_table.search(this.value).draw();
    });
});

function fetch_product_data() {
    $.ajax({
        url: '../PHP/api/get_products.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Create DataTable if it doesn't exist
            if (!product_table) {
                product_table = $("#product-list").DataTable({
                    paging: false,
                    searching: true,
                    destroy: true,
                    dom: 'rt'  // Remove the search box from DataTables (only show table content)
                });
            }

            // Clear existing data
            product_table.clear();

            // Add new data to the table
            if (data && data.length > 0) {
                data.forEach(function(product) {
                    const actions = `
                        <button class="btn-edit" data-id="${product.product_id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" data-id="${product.product_id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    
                    product_table.row.add([
                        product.product_id || '',
                        product.product_name || '',
                        product.category || '',
                        product.price || '',
                        product.stock || '',
                        product.status || '',
                        actions
                    ]);
                });
            }
            product_table.draw();
            
            // Attach event listeners to action buttons
            attachActionListeners();

            // Re-enable refresh button
            $('#refresh-product-table').prop('disabled', false).css('opacity', '1');
        },
        error: function(error) {
            console.error('Error fetching products:', error);
            $('#refresh-product-table').prop('disabled', false).css('opacity', '1');
        }
    });
}

function attachActionListeners() {
    // Edit button click handler
    $(document).on('click', '.btn-edit', function(e) {
        e.stopPropagation();
        const productId = $(this).data('id');
        openEditProductModal(productId);
    });
    
    // Delete button click handler
    $(document).on('click', '.btn-delete', function(e) {
        e.stopPropagation();
        const productId = $(this).data('id');
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    });
}

function openEditProductModal(productId) {
    // Fetch product data
    $.ajax({
        url: '../PHP/api/get_product_by_id.php',
        type: 'GET',
        dataType: 'json',
        data: { product_id: productId },
        success: function(product) {
            // Populate the form with product data
            $('#productname').val(product.product_name);
            $('#category').val(product.category);
            $('#quantity').val(product.stock);
            $('#price').val(product.price);
            
            // Show edit mode
            $('#sign-up').attr('data-mode', 'edit').attr('data-product-id', productId);
            $('#header p').text('Edit Product');
            $('#submit-area button').text('Update Product').attr('id', 'btn-submit');
            
            // Show the form by adding the open class
            const addUserPanel = $('#add-user');
            addUserPanel.addClass('open');
            
            // Scroll to the form
            $('html, body').animate({ scrollTop: addUserPanel.offset().top }, 'slow');
        },
        error: function(error) {
            console.error('Error fetching product:', error);
            alert('Failed to load product data');
        }
    });
}

function deleteProduct(productId) {
    $.ajax({
        url: '../PHP/api/delete_product.php',
        type: 'POST',
        dataType: 'json',
        data: { product_id: productId },
        success: function(response) {
            if (response.success) {
                alert(response.message || 'Product deleted successfully');
                fetch_product_data(); // Refresh table
            } else {
                alert(response.error || 'Failed to delete product');
            }
        },
        error: function(error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    });
}
