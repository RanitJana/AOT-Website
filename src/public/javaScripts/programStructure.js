const icon = document.querySelector('.scrollTo');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        icon.style.display = "block";
        setTimeout(() => {
            icon.style.transform = "scale(1)";
        }, 300);
    }
    else {
        icon.style.transform = "scale(0)";
        setTimeout(() => {
            icon.style.display = "none";
        }, 300);
    }
})