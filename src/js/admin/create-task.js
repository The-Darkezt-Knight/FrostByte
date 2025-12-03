const modal = document.getElementById("task-modal");
const btn = document.getElementById("add-task-btn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("task-form");

// Open modal
btn.onclick = () => modal.style.display = "flex";

// Close modal
span.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target == modal) modal.style.display = "none"; }

// Handle form submission
form.onsubmit = e => {
    e.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const customerName = document.getElementById("customer-name").value;
    const taskTime = document.getElementById("task-time").value;
    const taskLocation = document.getElementById("task-location").value;

    // Create task element
    const container = document.createElement("div");
    container.classList.add("container");
    container.innerHTML = `
        <div class="top">
            <i class="fa-solid fa-wrench" style="color: #2563eb;"></i>
            <div class="information">
                <p>${taskName}</p>
                <p>Customer: ${customerName}</p>
            </div>
            <div class="actions">
                <i class="fa-solid fa-check" style="color: limegreen;"></i>
                <i class="fa-solid fa-trash" style="color: red;"></i>
            </div>
        </div>
        <div class="settings">
            <span>
                <i class="fa-solid fa-user"></i>
                <p>${customerName}</p>
            </span>
            <span>
                <i class="fa-solid fa-clock"></i>
                <p>${taskTime}</p>
            </span>
            <span>
                <i class="fa-solid fa-location-dot"></i>
                <p>${taskLocation}</p>
            </span>
        </div>
    `;

    document.querySelector("#technician-schedule #body").appendChild(container);

    // Reset form and close modal
    form.reset();
    modal.style.display = "none";
};