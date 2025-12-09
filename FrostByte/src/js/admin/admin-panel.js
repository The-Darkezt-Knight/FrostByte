const containers = document.querySelectorAll(".container");
    const main_contents = document.querySelector(".main-content");
    let currentActive = null;

    const overview = document.getElementById("overview");
    const product_management = document.getElementById("product-management");
    const order_management = document.getElementById("order-management");
    const technician_schedule = document.getElementById("technician-schedule");
    const buyback = document.getElementById("buyback");
    let currentShown = null;

    containers.forEach(container => {
        container.addEventListener("click", ()=>{

            if(currentActive)
            {
                currentActive.classList.remove("active");
            }

            if(container.id === "overview-btn")
            {
                overview.style.display = "flex";
                product_management.style.display = "none";
                order_management.style.display = "none";
                technician_schedule.style.display = "none";
                buyback.style.display = "none";
            }

            if(container.id === "product-management-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "flex";
                order_management.style.display = "none";
                technician_schedule.style.display = "none";
                buyback.style.display = "none";
                // Hide all submenu content
                document.getElementById("products").style.display = "none";
                document.getElementById("categories-brands").style.display = "none";
                document.getElementById("stock-management").style.display = "none";
                document.getElementById("used-components").style.display = "none";
            }

            if(container.id === "order-management-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "none";
                order_management.style.display = "flex";
                technician_schedule.style.display = "none";
                buyback.style.display = "none";
            }

            if(container.id === "technician-schedule-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "none";
                order_management.style.display = "none";
                technician_schedule.style.display = "flex";
                buyback.style.display = "none";
            }

            if(container.id === "buyback-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "none";
                order_management.style.display = "none";
                technician_schedule.style.display = "none";
                buyback.style.display = "flex";
            }

            container.classList.add("shown");
            currentActive = container;   
        }) 
    })

// Submenu toggle functionality
const productManagementBtn = document.getElementById("product-management-btn");
const productManagementSubmenu = document.getElementById("product-management-submenu");

if (productManagementBtn) {
    productManagementBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        productManagementSubmenu.classList.toggle("open");
    });
}

// Submenu item click handlers
const submenuItems = document.querySelectorAll("#product-management-submenu li");
submenuItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        e.stopPropagation();
        
        // Hide all submenu content
        document.getElementById("products").style.display = "none";
        document.getElementById("categories-brands").style.display = "none";
        document.getElementById("stock-management").style.display = "none";
        document.getElementById("used-components").style.display = "none";
        
        // Show the clicked submenu content
        if (index === 0) {
            document.getElementById("products").style.display = "flex";
        } else if (index === 1) {
            document.getElementById("categories-brands").style.display = "flex";
        } else if (index === 2) {
            document.getElementById("stock-management").style.display = "flex";
        } else if (index === 3) {
            document.getElementById("used-components").style.display = "flex";
        }
    });
});