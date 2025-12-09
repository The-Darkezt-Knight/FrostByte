const body = document.querySelector("#body");
const add_user = document.querySelector("#add-user");
const add_user_btn = document.querySelector("#add-product"); 
const productForm = document.querySelector("#sign-up");

add_user_btn.addEventListener("click", (e) => {
    e.stopPropagation();
    add_user.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!add_user.contains(e.target) && !add_user_btn.contains(e.target)) {
        add_user.classList.remove("open");
    }
});

add_user.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Handle form submission
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(productForm);
    
    // Add mode (add or edit)
    const mode = productForm.getAttribute('data-mode') || 'add';
    formData.append('mode', mode);
    
    // If editing, add product_id
    if (mode === 'edit') {
        const productId = productForm.getAttribute('data-product-id');
        formData.append('product_id', productId);
    }
    
    // Send to server
    $.ajax({
        url: '../PHP/api/add_product.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                alert(response.message);
                // Reset form to add mode
                productForm.reset();
                productForm.removeAttribute('data-mode');
                productForm.removeAttribute('data-product-id');
                $('#header p').text('Add products to the shelves');
                $('#btn-submit').text('Add product');
                // Close the panel
                add_user.classList.remove("open");
                // Refresh the product table without full page reload
                fetch_product_data();
            } else {
                alert("Error: " + response.error);
            }
        },
        error: function(error) {
            console.error('Error:', error);
            alert("Failed to save product");
        }
    });
});