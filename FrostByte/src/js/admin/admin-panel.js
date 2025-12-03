const containers = document.querySelectorAll(".container");
    const main_contents = document.querySelector(".main-content");
    let currentActive = null;

    const overview = document.getElementById("overview");
    const product_management = document.getElementById("product-management");
    const order_management = document.getElementById("order-management");
    const technician_schedule = document.getElementById("technician-schedule");
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
                console.log("please work");
            }

            if(container.id === "product-management-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "flex";
                order_management.style.display = "none";
                technician_schedule.style.display = "none";
                console.log("please work");
            }

            if(container.id === "order-management-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "none";
                order_management.style.display = "flex";
                technician_schedule.style.display = "none";
                console.log("please work");
            }

            if(container.id === "technician-schedule-btn")
            {
                overview.style.display = "none";
                product_management.style.display = "none";
                order_management.style.display = "none";
                technician_schedule.style.display = "flex";
                console.log("please work");
            }

            container.classList.add("shown");
            currentActive = container;   
        }) 
    })