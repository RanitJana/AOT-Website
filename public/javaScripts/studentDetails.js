let btns = document.querySelectorAll('.editButton');
const inputs = document.querySelectorAll('.form-group input');
btns[0].addEventListener('click', e => {
    inputs.forEach(input => {
        input.disabled = false;
    });
    btns[1].style.display = 'flex';
    btns[0].style.display = 'none';
})
btns[1].addEventListener('click', e => {
    btns[0].style.display = 'flex';
    btns[1].style.display = 'none';
    window.location.reload()
})

document.querySelector('.backImg').addEventListener('click', () => {
    window.location.href = '/studentPortal/studentlogin';
})
