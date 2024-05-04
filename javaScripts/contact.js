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