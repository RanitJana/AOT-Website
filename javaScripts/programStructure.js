const icon = document.querySelector('.scrollTo');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        icon.style.display = "block";
    }
    else {
        icon.style.display = "none";
    }
})