const body = document.querySelector("#body");
const add_user = document.querySelector("#add-user");
const add_user_btn = document.querySelector("#add-product"); 

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