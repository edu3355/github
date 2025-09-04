const btn = document.querySelector('#button');
const status = document.querySelector('#status');
const quote = document.querySelector('#quote');

async function get() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        console.log(`"${data.content}" - ${data.author}`);
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