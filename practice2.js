const btn = document.querySelector('#button');
const status = document.querySelector('#status');
const quote = document.querySelector('#quote');

async function get() {
    try {
        const response = await fetch("http://localhost:3000/api/quote");
        const data = await response.json();
        console.log(data[0].q + " - " + data[0].a);
    } catch (error) {
        console.warn('Failed to load the quote.')
    }
}
btn.addEventListener("click", () => {
    if (btn.style.backgroundColor === "green") {
        btn.style.backgroundColor = "red";
        status.textContent = "OFF";
    } else {
        btn.style.backgroundColor = "green";
        status.textContent = "ON";
    }
});

quote.addEventListener("click", get);