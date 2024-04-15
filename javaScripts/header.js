let hambergMenu = document.querySelector('.hamberg-menu');
let body = document.querySelector('body');
let nav = document.querySelector('nav');
let goback = document.querySelector('.goback');
goback.addEventListener('click', () => {
    nav.style.right = "-100%";
})
hambergMenu.addEventListener('click', e => {
    nav.style.right = "0%"
})
window.addEventListener('click', e => {
    if (e.x < screen.width - 285) {
        nav.style.right = "-100%"
    }
})