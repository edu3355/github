const btn = document.querySelector('#button');
const status = document.querySelector('#status');
const quote = document.querySelector('#quote');
const quoteMsg = document.querySelector('#quote-msg');

async function get() {
    try {
        const response = await fetch("http://localhost:3000/api/quote");
        const data = await response.json();
        console.log(data[0].q + " - " + data[0].a);
        // 메시지 표시
        showQuoteMsg('quote가 생성되었습니다. 콘솔을 확인해주세요!');
    } catch (error) {
        console.warn('Failed to load the quote.')
    }
}

function showQuoteMsg(msg) {
    quoteMsg.textContent = msg;
    quoteMsg.classList.add('show');
    setTimeout(() => {
        quoteMsg.classList.remove('show');
    }, 2000);
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