const quote = document.querySelector('#quote');
const quoteMsg = document.querySelector('#quote-msg');
const toggle = document.querySelector('#toggle');

async function get() {
    try {
        const response = await fetch("http://localhost:3000/api/quote");
        const data = await response.json();
        console.log(data[0].q + " - " + data[0].a);
        if (data[0].q === 'Too many requests. Obtain an auth key for unlimited access.') {
            quoteMsg.style.backgroundColor = '#F8D7DAE6';
            quoteMsg.style.color = '#721c24';
            showQuoteMsg('Too many requests. Please try later.');
        } else {
            quoteMsg.style.backgroundColor = '#D4EDDAE6';
            quoteMsg.style.color = '#155724';
            showQuoteMsg('The quote has been created. Please check the console!');
        }
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

quote.addEventListener("click", get);

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.body.style.backgroundColor = 'white';
    } else {
        document.body.style.backgroundColor = '#333';
    }
});