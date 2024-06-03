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
    if (count == 0) {
        count = slideImage.length - 1;
    }
    else {
        count--;
    }
    slideImage[count].style.animation = 'prev2 0.5s ease-in forwards';
}

// Auto slideing
function autoSliding() {
    deletInterval = setInterval(() => {
        slideNext();
    }, 4000)
}
autoSliding();

// Stop auto sliding when mouse is over
const container = document.querySelector('.intro-slide-container');
container.addEventListener('mouseover', function () {
    clearInterval(deletInterval);
});

// Resume sliding when mouse is out
container.addEventListener('mouseout', autoSliding);




// ============================   logic for tap to answer  ==========================


const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        // Close all other answer sections except the one clicked
        const otherAnswers = document.querySelectorAll('.answer');
        otherAnswers.forEach(otherAnswer => {
            const imgElement = question.querySelector('.rotate-icon');
            imgElement.classList.remove('rotate', 'reverseRotate'); // Remove previous rotation classes
            if (otherAnswer !== question.nextElementSibling && otherAnswer.classList.contains('displayAnswer')) {
                otherAnswer.classList.remove('displayAnswer');
                otherAnswer.classList.add('hideAnswer');
                const imgElement = question.querySelector('.rotate-icon');
                imgElement.classList.toggle('reverseRotate');
            }
        });

        // Toggle the display of the clicked answer section
        const answer = question.nextElementSibling;
        answer.classList.toggle('displayAnswer');
        answer.classList.toggle('hideAnswer');

        // Toggle the rotation of the clicked question's icon
        const imgElement = question.querySelector('.rotate-icon');
        imgElement.classList.toggle('rotate');

        // Toggle the reverse rotation of the clicked question's icon when closing the answer
        if (!answer.classList.contains('displayAnswer')) {
            imgElement.classList.toggle('reverseRotate');
        }
    });
});
