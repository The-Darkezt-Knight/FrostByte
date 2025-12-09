const containers = document.querySelectorAll(".container");
    const main_contents = document.querySelector(".main-content");
    let currentActive = null;

    const main_panel = document.getElementById("main-panel");
    const orders = document.getElementById("orders");
    const cart = document.getElementById("cart");
    const services = document.getElementById("services");
    const sell_parts = document.getElementById("sell-parts");
    const account_settings = document.getElementById("account-settings");
    let currentShown = null;

    containers.forEach(container => {
        container.addEventListener("click", ()=>{

            if(currentActive)
            {
                currentActive.classList.remove("shown");
            }

            if(container.id === "main-panel-btn")
            {
                main_panel.style.display = "flex";
                orders.style.display = "none";
                cart.style.display = "none";
                services.style.display = "none";
                sell_parts.style.display = "none";
                account_settings.style.display = "none";
            }

            if(container.id === "orders-btn")
            {
                main_panel.style.display = "none";
                orders.style.display = "flex";
                cart.style.display = "none";
                services.style.display = "none";
                sell_parts.style.display = "none";
                account_settings.style.display = "none";
            }

            if(container.id === "cart-btn")
            {
                main_panel.style.display = "none";
                orders.style.display = "none";
                cart.style.display = "flex";
                services.style.display = "none";
                sell_parts.style.display = "none";
                account_settings.style.display = "none";
            }

            if(container.id === "services-btn")
            {
                main_panel.style.display = "none";
                orders.style.display = "none";
                cart.style.display = "none";
                services.style.display = "flex";
                sell_parts.style.display = "none";
                account_settings.style.display = "none";
            }

            if(container.id === "sell-parts-btn")
            {
                main_panel.style.display = "none";
                orders.style.display = "none";
                cart.style.display = "none";
                services.style.display = "none";
                sell_parts.style.display = "flex";
                account_settings.style.display = "none";
            }

            if(container.id === "account-settings-btn")
            {
                main_panel.style.display = "none";
                orders.style.display = "none";
                cart.style.display = "none";
                services.style.display = "none";
                sell_parts.style.display = "none";
                account_settings.style.display = "flex";
            }

            currentActive = container;  
            container.classList.add("shown"); 
        }) 
    })