let hambergMenu = document.querySelector('.hamberg-menu');
let body = document.querySelector('body');
let nav = document.querySelector('nav');
let goback = document.querySelector('.goback');
let deny = document.querySelector('.deny');
let isNavOpen = false;
goback.addEventListener('click', () => {
    requestAnimationFrame(() => {
        isNavOpen = false;
        nav.style.transform = "translateX(100%)";
        body.style.overflowY = "auto";
        deny.style.right = '-100%';
        deny.style.backgroundColor = "transparent";
    })
})
hambergMenu.addEventListener('click', e => {
    requestAnimationFrame(() => {
        isNavOpen = true;
        nav.style.transform = "translateX(0%)";
        body.style.overflowY = "hidden";
        deny.style.right = '0%';
        deny.style.backgroundColor = "rgba(0, 0, 0, 0.649)";
    })
})
window.addEventListener('click', e => {
    let value = window.getComputedStyle(hambergMenu).display;
    requestAnimationFrame(() => {
        if (e.x <= screen.width - nav.clientWidth && value == 'flex') {
            isNavOpen = false;
            nav.style.transform = "translateX(100%)";
            body.style.overflowY = "auto";
            deny.style.right = '-100%';
            deny.style.backgroundColor = "transparent";

        }
    })
})
window.addEventListener('resize', () => {
    let value = window.getComputedStyle(hambergMenu).display;
    if (value == 'flex' && !isNavOpen) {
        nav.style.transform = "translateX(100%)";
    }
    if (value == 'flex' && isNavOpen && window.getComputedStyle(nav).display == 'block') {
        requestAnimationFrame(() => {
            nav.style.transform = "translateX(0%)";
            body.style.overflowY = "hidden";
            deny.style.right = '0%';
            deny.style.backgroundColor = "rgba(0, 0, 0, 0.649)";
        })
    }
    if (value == "none") {
        requestAnimationFrame(() => {
            nav.style.transform = "translateX(0%)";
            body.style.overflowY = "auto";
            deny.style.right = '-100%';
            deny.style.backgroundColor = "transparent";
        })
    }

})
let parentNav = document.querySelectorAll('.parent-nav');
let parentNavChild = document.querySelectorAll('.parent-nav>ul');
let parentNavChild2 = document.querySelectorAll('.parent-nav2>ul');

let allchild = document.querySelectorAll('.parent-nav > ul> li');

function editRoateImg(allchilds) {
    allchild.forEach(val => {
        if (val.getAttribute('class') === 'parent-nav2') {
            let arrow = (val.childNodes[1].childNodes[3]);
            let value = window.getComputedStyle(hambergMenu).display;
            if (value == 'flex') {
                arrow.style.transform = "rotate(90deg)";
            }
            else {
                arrow.style.transform = "rotate(0deg)";
            }
        }
    })
}

parentNav.forEach((val, idx) => {
    val.addEventListener('click', () => {
        parentNav.forEach((value, index) => {
            if (value.getAttribute('class') === 'parent-nav') {
                let arrow = (value.childNodes[1].childNodes[3]);
                if (idx != index && arrow) {
                    arrow.style.transform = "rotate(90deg)";
                }
            }
        })
        let arrow = null;
        try {
            arrow = val.childNodes[1].childNodes[3];
        }
        catch (err) {
            console.log(err);
        }
        parentNavChild.forEach((val, index) => {
            if (idx != index) {
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
        let nodeVal = parentNavChild[idx].style.display;
        if (nodeVal == 'block') {
            if (arrow) arrow.style.transform = "rotate(90deg)";
            parentNavChild[idx].style.display = "none";
            parentNavChild[idx].style.zIndex = '50';
        }
        else {
            parentNavChild[idx].style.display = "block";
            parentNavChild[idx].style.zIndex = '100';
            if (arrow) arrow.style.transform = "rotate(-90deg)";
        }
    }, false);
})

allchild.forEach((allchilds, idx) => {
    allchilds.addEventListener('click', () => {
        let arrow = null;
        try {
            arrow = allchilds.childNodes[1].childNodes[3];
        }
        catch (err) {
            console.log(err);
        }
        parentNavChild2.forEach((val, index) => {
            if (allchilds.childNodes[3]) {
                if (val != allchilds.childNodes[3]) {
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
            }
        })
        editRoateImg();
        if (allchilds.getAttribute("class") == 'parent-nav2') {
            let values = allchilds.childNodes;
            try {
                let nodeVal = values[3].style.display;
                if (nodeVal == 'block') {
                    values[3].style.display = "none";
                    values[3].style.zIndex = '100';
                    let value = window.getComputedStyle(hambergMenu).display;
                    if (arrow) {
                        if (value == 'flex') {
                            arrow.style.transform = "rotate(90deg)";
                        }
                        else {
                            arrow.style.transform = "rotate(0deg)";
                        }
                    }
                }
                else {
                    values[3].style.display = "block";
                    values[3].style.zIndex = '100';
                    let value = window.getComputedStyle(hambergMenu).display;
                    if (arrow) {
                        if (value == 'flex') {
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
        }
        event.stopPropagation();
    }, false)
})
let parentNav2Child = document.querySelectorAll('.parent-nav2 > ul > li');
parentNav2Child.forEach(val => {
    val.addEventListener('click', () => {
        event.stopPropagation();
    }, false)
})

let parentNav3 = document.querySelectorAll('.parent-nav3');
parentNav3.forEach(child => {
    child.childNodes[3].style.display = 'none';
    child.childNodes[1].addEventListener('click', () => {
        parentNav3.forEach(child2 => {
            if (child.childNodes[1] != child2.childNodes[1]) {
                if (child2.childNodes[3].style.display == 'block') {
                    child2.childNodes[3].style.display = 'none';
                    let arrow = child2.childNodes[1].childNodes[3];
                    if (screen.width <= 571) {
                        arrow.style.transform = "rotate(90deg)";
                    }
                    else {
                        arrow.style.transform = "rotate(0deg)";
                    }
                }
            }
        })
        let val = child.childNodes[3].style.display;
        let arrow = child.childNodes[1].childNodes[3];
        if (val == 'block') {
            child.childNodes[3].style.display = 'none';
            let value = window.getComputedStyle(hambergMenu).display;
            if (value == 'flex') {
                arrow.style.transform = "rotate(90deg)";
            }
            else {
                arrow.style.transform = "rotate(0deg)";
            }

        } else {
            child.childNodes[3].style.display = 'block';
            let value = window.getComputedStyle(hambergMenu).display;
            if (value == 'flex') {
                arrow.style.transform = "rotate(-90deg)";
            }
            else {
                arrow.style.transform = "rotate(-180deg)";
            }
        }
    })
})

//move sticky to top
let header = document.querySelector('header');
let stickyMove, isMouseEnter = false;

function isUserWorkingInNav() {
    let ans = false;
    parentNavChild.forEach(val => {
        if (window.getComputedStyle(val).display == 'block') {
            ans = true;
        }
    })
    ans |= isMouseEnter;
    return ans;
}

function resetTimeout() {
    if (window.getComputedStyle(hambergMenu).display == 'none') {
        if (isUserWorkingInNav()) {
            clearTimeout(stickyMove);
            nav.style.transform = 'translate(0,0%)';
            return;
        }
        else {
            nav.style.transition = "all 0.5s ease";
            nav.style.transform = 'translate(0,0%)';
            clearTimeout(stickyMove);
            stickyMove = setTimeout(() => {
                if (Math.floor(window.scrollY) > Math.floor(header.offsetHeight + nav.offsetHeight)) {
                    nav.style.transform = 'translate(0,-100%)';
                }
            }, 3000);
        }
    }

}

window.addEventListener('scroll', resetTimeout);
window.addEventListener('touchstart', resetTimeout);
parentNav.forEach((val, idx) => {
    val.addEventListener('click', () => {
        resetTimeout();
    })
})
nav.addEventListener('mouseover', e => {
    isMouseEnter = true;
    resetTimeout();
})
nav.addEventListener('mouseleave', e => {
    isMouseEnter = false;
    resetTimeout();
})