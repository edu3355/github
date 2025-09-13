const quote = document.querySelector('#quote');
const quoteMsg = document.querySelector('#quote-msg');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalToggle = document.getElementById('modal-toggle');
const modalSlider = document.getElementById('modal-slider');
const powerby = document.querySelector('#powerby');
const time = document.querySelector('#time');
const date = document.querySelector('#date');
const widget1 = document.querySelector('#widget1');
const widget2 = document.querySelector('#widget2');
const gridbox = document.querySelector('#gridbox');
const navLinks = document.querySelectorAll('.nav-link');
const homeLink = document.querySelector('.nav-link[id="Home"]');
const title = document.querySelector('.title');
const exquote = document.querySelector('#exquote');
const exquote2 = document.querySelector('#exquote2');
const exquote3 = document.querySelector('#exquote3');

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

function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const datestr = String(now.getDate()).padStart(2, "0");
    const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
    const timestr = now.toLocaleTimeString("en-US", {hour12:true, hour: "2-digit", minute:"2-digit"});

    date.innerText = `${year}-${month}-${datestr}`;
    time.innerText = `${timestr} (${day})`;
}

quote.addEventListener("click", get);

// 네비게이션 링크 클릭 이벤트
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // 모든 링크에서 active 클래스 제거
        navLinks.forEach(l => l.classList.remove('active'));
        // 클릭된 링크에 active 클래스 추가
        link.classList.add('active');
        
        // Setting 링크 클릭 시 모달 표시
        if (link.textContent === 'Setting') {
            settingsModal.classList.add('show');
        }
    });
});

closeModalBtn.addEventListener('click', () => {
    settingsModal.classList.remove('show');
    navLinks.forEach(l => l.classList.remove('active'));
    homeLink.classList.add('active');
});

settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('show');
    }
});

modalToggle.addEventListener('change', () => {
    if (modalToggle.checked) {
        modalSlider.style.setProperty("--text", '"Dark"');
        document.body.style.backgroundColor = '#333';
        powerby.style.color = 'white';
        gridbox.style.backgroundColor = '#E1E1E180';
        time.style.color = 'black';
        date.style.color = 'black';
        widget1.style.color = 'black';
        widget2.style.color = 'black';
        quote.classList.add('quotedark');
    } else {
        modalSlider.style.setProperty("--text", '"Light"');
        document.body.style.backgroundColor = '#f5f5f5';
        powerby.style.color = 'black';
        gridbox.style.backgroundColor = '#00000080';
        time.style.color = 'white';
        date.style.color = 'white';
        widget1.style.color = 'white';
        widget2.style.color = 'white';
        quote.classList.remove('quotedark');
    }
});

// 페이지 로드 시 요소들 순차적으로 나타나게 하기
function animateElements() {
    const elements = [
        { el: title, delay: 0 },
        { el: gridbox, delay: 200 },
        { el: quote, delay: 400 },
        { el: powerby, delay: 600 },
        { el: exquote2, delay: 800 },
        { el: exquote, delay: 1000 },
        { el: exquote3, delay: 1200 }
    ];

    // 모든 요소 초기화
    elements.forEach(({el}) => {
        if (el) {
            el.classList.add('hidden');
        }
    });

    // 순차적으로 요소들을 보여줌
    elements.forEach(({el, delay}) => {
        if (el) {
            setTimeout(() => {
                el.classList.remove('hidden');
                el.classList.add('fade-in');
                if (el.classList.contains('exquote') || 
                    el.classList.contains('exquote2') || 
                    el.classList.contains('exquote3')) {
                    // exquote 요소들은 float 애니메이션을 위해 show 클래스도 추가
                    setTimeout(() => {
                        el.classList.add('show');
                    }, 600); // 페이드인 애니메이션이 끝난 후 float 시작
                }
            }, delay);
        }
    });
}

window.addEventListener('load', animateElements);

setInterval(updateTime, 1000);
updateTime();