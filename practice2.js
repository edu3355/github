const btn = document.querySelector('#button');

btn.addEventListener("click", () => {
    if (btn.style.backgroundColor === "green") {
        btn.style.backgroundColor = "red";
    } else {
        btn.style.backgroundColor = "green";
    }
    console.warn('button clicked');
});