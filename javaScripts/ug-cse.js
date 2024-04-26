let slideImage = document.querySelectorAll('.intro-img')
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

let count = 0;


next.addEventListener('click', slideNext);
function slideNext() {
    slideImage[count].style.animation = 'next1 0.5s ease-in forwards';
    if (count >= slideImage.length - 1) {
        count = 0;
    }
    else {
        count++;
    }
    slideImage[count].style.animation = 'next2 0.5s ease-in forwards';
    
}

prev.addEventListener('click', slidePrev);
function slidePrev() {
    slideImage[count].style.animation = 'prev1 0.5s ease-in forwards';
    if (count==0) {
        count = slideImage.length - 1;
    }
    else {
        count--;
    }
    slideImage[count].style.animation = 'prev2 0.5s ease-in forwards';
}

// Auto slideing
function autoSliding(){
    deletInterval=setInterval(()=>{
        slideNext();
    },4000)
}
autoSliding();

// Stop auto sliding when mouse is over
const container = document.querySelector('.intro-slide-container');
container.addEventListener('mouseover', function(){
    clearInterval(deletInterval);
});

// Resume sliding when mouse is out
container.addEventListener('mouseout', autoSliding);




