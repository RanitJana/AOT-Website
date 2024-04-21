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
        let arrow = null;
        try {
            arrow = val.childNodes[1].childNodes[3];
            console.log(val.childNodes);
        }
        catch (err) {
            console.log(err);
        }
        let nodeVal = parentNavChild[idx].style.display;
        if (nodeVal == 'block') {
            parentNavChild[idx].style.display = "none";
            parentNavChild[idx].style.zIndex = '50';
            if (arrow) arrow.style.transform = "rotate(90deg)";
        }
        else {
            parentNavChild[idx].style.display = "block";
            parentNavChild[idx].style.zIndex = '100';
            if (arrow) arrow.style.transform = "rotate(-90deg)";
        }
    }, false)
})
function editRoateImg(allchilds) {
    allchild.forEach(val => {
        if (val.getAttribute('class') === 'parent-nav2') {
            let arrow = (val.childNodes[1].childNodes[3]);
            if (screen.width <= 571) {
                arrow.style.transform = "rotate(90deg)";
            }
            else {
                arrow.style.transform = "rotate(0deg)";
            }
        }
    })
}
allchild.forEach((allchilds, idx) => {
    allchilds.addEventListener('click', () => {
        let arrow = null;
        try {
            arrow = allchilds.childNodes[1].childNodes[3];
            editRoateImg();
        }
        catch (err) {
            console.log(err);
        }
        console.log(parentNavChild2);
        parentNavChild2.forEach((val, index) => {
            if (idx - 1 != index) {
                try {
                    if (val.style.display == 'block') {
                        val.style.display = "none";
                        val.style.zIndex = '100';
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        })
        editRoateImg();
        try {
            let nodeVal = parentNavChild2[idx - 1].style.display;
            if (nodeVal == 'block') {
                parentNavChild2[idx - 1].style.display = "none";
                parentNavChild2[idx - 1].style.zIndex = '100';
                if (arrow) {
                    if (screen.width <= 571) {
                        arrow.style.transform = "rotate(90deg)";
                    }
                    else {
                        arrow.style.transform = "rotate(0deg)";
                    }
                }
            }
            else {
                parentNavChild2[idx - 1].style.display = "block";
                parentNavChild2[idx - 1].style.zIndex = '100';
                if (arrow) {
                    if (screen.width <= 571) {
                        arrow.style.transform = "rotate(-90deg)";
                    }
                    else {
                        arrow.style.transform = "rotate(-180deg)";
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
        }
        event.stopPropagation();
    }, false)
})