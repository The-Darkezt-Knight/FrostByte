
    const containers = document.querySelectorAll(".container");
    const main_contents = document.querySelector(".main-content");
    let currentActive = null;

    const user_management = document.getElementById("user-management");
    const database_administration = document.getElementById("database-administration");
    const system_monitoring = document.getElementById("system-monitoring");
    const system_config = document.getElementById("system-config");
    let currentShown = null;

    containers.forEach(container => {
        container.addEventListener("click", ()=>{

            if(currentActive)
            {
                currentActive.classList.remove("active");
            }

            if(container.id === "user-management-btn")
            {
                user_management.style.display = "flex";
                database_administration.style.display = "none";
                system_monitoring.style.display = "none";
                system_config.style.display = "none";
            }

            if(container.id === "database-administration-btn")
            {
                user_management.style.display = "none";
                database_administration.style.display = "flex";
                system_monitoring.style.display = "none";
                system_config.style.display = "none";
            }

            if(container.id === "system-monitoring-btn")
            {
                user_management.style.display = "none";
                database_administration.style.display = "none";
                system_monitoring.style.display = "flex";
                system_config.style.display = "none";
            }

            if(container.id === "system-config-btn")
            {
                user_management.style.display = "none";
                database_administration.style.display = "none";
                system_monitoring.style.display = "none";
                system_config.style.display = "flex";
            }

            container.classList.add("active");
            currentActive = container;   
        }) 
    })

