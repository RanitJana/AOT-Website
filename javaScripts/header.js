let hambergMenu = document.querySelector('.hamberg-menu');
let body = document.querySelector('body');
let nav = document.querySelector('nav');
let goback = document.querySelector('.goback');
goback.addEventListener('click', () => {
    nav.style.right = "-100%";
})
hambergMenu.addEventListener('click', e => {
    nav.style.right = "0%";
})
window.addEventListener('click', e => {
    if (e.x <= screen.width - nav.clientWidth) {
        nav.style.right = "-100%";
    }
})

let parentNav = document.querySelectorAll('.parent-nav');
let parentNavChild = document.querySelectorAll('.parent-nav>ul');
let parentNavChild2 = document.querySelectorAll('.parent-nav2>ul');

let allchild = document.querySelectorAll('.parent-nav > ul> li');
parentNav.forEach((val, idx) => {
    val.addEventListener('click', () => {
        let nodeVal = parentNavChild[idx].style.display;
        if (nodeVal == 'block') {
            parentNavChild[idx].style.display = "none";
            parentNavChild[idx].style.zIndex = '50';
        }
        else {
            parentNavChild[idx].style.display = "block";
            parentNavChild[idx].style.zIndex = '100';
        }
    }, false)
})
allchild.forEach((allchilds, idx) => {
    allchilds.addEventListener('click', () => {
        try {

            let nodeVal = parentNavChild2[idx - 1].style.display;
            if (nodeVal == 'block') {
                parentNavChild2[idx - 1].style.display = "none";
                parentNavChild2[idx - 1].style.zIndex = '100';
            }
            else {
                parentNavChild2[idx - 1].style.display = "block";
                parentNavChild2[idx - 1].style.zIndex = '100';
            }
        }
        catch (err) {
            console.log(err);
        }
        event.stopPropagation();
    }, false)

})