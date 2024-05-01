
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
                const imgElement = question.querySelector('.rotate-icon');
                imgElement.classList.toggle('reverseRotate');
            }
        });

        // Toggle the display of the clicked answer section
        const answer = question.nextElementSibling;
        answer.classList.toggle('displayAnswer');

        // Toggle the rotation of the clicked question's icon
        const imgElement = question.querySelector('.rotate-icon');
        imgElement.classList.toggle('rotate');

        // Toggle the reverse rotation of the clicked question's icon when closing the answer
        if (!answer.classList.contains('displayAnswer')) {
            imgElement.classList.toggle('reverseRotate');
        }
    });
});
