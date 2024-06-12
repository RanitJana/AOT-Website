let btns = document.querySelectorAll('.editButton');
const inputs = document.querySelectorAll('.form-group input');
const select = document.querySelectorAll('select');
btns[0].addEventListener('click', e => {
    inputs.forEach(input => {
        if (input.getAttribute('id') != 'admissionYear' && input.getAttribute('id') != 'department' && input.getAttribute('id') != 'universityRollNo')
            input.disabled = false;
    });
    select.forEach(sel => {
        sel.disabled = false;
    })
    select[0].style.backgroundColor = 'white';
    select[0].style.border = '1px solid gray';
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
