//<==================================================serve api form backend==================================================>

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let res = await fetch('/temp/temp.json');
            console.log(res);
            let data = await res.json();
            resolve(data);
        }, 4)
    })
}

//<================================================end api==============================================>
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
    document.addEventListener('DOMContentLoaded', e => {
        inputs.forEach(input => {
            input.disabled = true;
        });
    })
    btns[0].style.display = 'flex';
    btns[1].style.display = 'none';
})


let students = [];
let currentPage = 1;
const rowsPerPage = document.getElementById('rowNumber').value;

function generateStudents(data) {
    for (let i = 0; i < data.length; i++) {
        students.push({
            roll: `${data[i]["roll"]}`,
            name: `${data[i]["fullName"]}`,
            sgpas: Array.from({ length: 8 }, () => (Math.random() * (10 - 6) + 6).toFixed(2))
        });
    }
}

function renderTable(page) {
    const rowsPerPage = parseInt(document.getElementById('rowNumber').value, 10);
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the table body
    const start = (page - 1) * rowsPerPage;
    const end = start + parseInt(rowsPerPage);

    const pageStudents = students.slice(start, end);

    pageStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            ${student.sgpas.map(sgpa => `<td><input type="number" step="0.01" min="0" max="10" value="${sgpa}" disabled></td>`).join('')}
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('prevButton').disabled = page === 1;
    document.getElementById('nextButton').disabled = end >= students.length;
}

function nextPage() {
    currentPage++;
    renderTable(currentPage);
}

function prevPage() {
    currentPage--;
    renderTable(currentPage);
}

function updateTable() {
    currentPage = 1;
    renderTable(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    getData().then((data) => {
        generateStudents(data);
        renderTable(currentPage);
        document.getElementById('rowNumber').addEventListener('change', updateTable);
    })
});
