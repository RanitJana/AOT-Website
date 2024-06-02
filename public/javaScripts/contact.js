//move sticky to top
let backImg = document.querySelector('.backImg');
backImg.addEventListener('click', e => {
    window.history.back();
})



let header = document.querySelector('header');
let back = document.querySelector('.back');
let stickyMove;

function resetTimeout() {
    back.style.transition = "all 0.5s ease";
    back.style.transform = 'translate(0,0%)';
    clearTimeout(stickyMove);
    stickyMove = setTimeout(() => {
        if (Math.floor(window.scrollY) > Math.floor(header.offsetHeight + back.offsetHeight)) {
            back.style.transform = 'translate(0,-100%)';
        }
    }, 3000);
}

window.addEventListener('scroll', resetTimeout);
window.addEventListener('touchstart', resetTimeout);

//copy text

let copyBtn = document.querySelectorAll('.copyBtn');
let content = document.querySelectorAll('.content');

copyBtn.forEach((val, idx) => {
    val.addEventListener('click', e => {
        let text = content[idx].textContent;
        navigator.clipboard.writeText(text);
        val.style.scale = '0';
        copyBtn.forEach(val2 => {
            if (val2.getAttribute('src') == '/assets/images/icons8-double-tick-24.png') {
                val2.style.scale = '0';
                setTimeout(() => {
                    val2.setAttribute('src', '/assets/images/icons8-copy-96.png');
                    val2.style.scale = '1';
                }, 100);
            }
        })
        setTimeout(() => {
            val.setAttribute('src', '/assets/images/icons8-double-tick-24.png');
            val.style.scale = '1';
        }, 100);
    })
})