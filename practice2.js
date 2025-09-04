const btn = document.querySelector('#button');
const status = document.querySelector('#status');

btn.addEventListener("click", () => {
    if (btn.style.backgroundColor === "green") {
        btn.style.backgroundColor = "red";
        status.textContent = "OFF";
    } else {
        btn.style.backgroundColor = "green";
        status.textContent = "ON";
    }
    console.warn('button clicked');
});