//<==================================================serve api form backend==================================================>

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let url = `/api/getDataStudent`;
            let res = await fetch(url);
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
    btns[0].style.display = 'flex';
    btns[1].style.display = 'none';
    window.location.reload()
})


let students = [];
let currentPage = 1;
const rowsPerPage = document.getElementById('rowNumber').value;


function fillInputs(data) {
    document.querySelector('#name').setAttribute('value', data.fullName);
    document.querySelector('#universityRollNo').setAttribute('value', data.roll);
    document.querySelector('#personalEmail').setAttribute('value', data.emailPersonal);
    document.querySelector('#collegeEmail').setAttribute('value', data.emailAot);
    document.querySelector('#contact').setAttribute('value', data.contact);
    document.querySelector('#guardianName').setAttribute('value', data.gurdian);
    document.querySelector('#guardianContact').setAttribute('value', data.gurdianContact);
    document.querySelector('#localGuardianName').setAttribute('value', data.localGurdian);
    document.querySelector('#localGuardianContact').setAttribute('value', data.localGurdianContact);
    document.querySelector('#permanentAddress').setAttribute('value', data.permanentAddress);
    document.querySelector('#presentAddress').setAttribute('value', data.presentAddress);
    document.querySelector('.class10Marks').setAttribute('value', data.class10Marks);
    document.querySelector('.class12Marks').setAttribute('value', data.class12Marks);

    document.querySelector('#sgpa1').setAttribute('value', data.semMarks[0] ? data.semMarks[0] : "0");
    document.querySelector('#sgpa2').setAttribute('value', data.semMarks[1] ? data.semMarks[1] : "0");
    document.querySelector('#sgpa3').setAttribute('value', data.semMarks[2] ? data.semMarks[2] : "0");
    document.querySelector('#sgpa4').setAttribute('value', data.semMarks[3] ? data.semMarks[3] : "0");
    document.querySelector('#sgpa5').setAttribute('value', data.semMarks[4] ? data.semMarks[4] : "0");
    document.querySelector('#sgpa6').setAttribute('value', data.semMarks[5] ? data.semMarks[5] : "0");
    document.querySelector('#sgpa7').setAttribute('value', data.semMarks[6] ? data.semMarks[6] : "0");
    document.querySelector('#sgpa8').setAttribute('value', data.semMarks[7] ? data.semMarks[7] : "0");

}

let show = false;
function generateStudents(data) {
    for (let i = 0; i < data.length; i++) {
        let arr = data[i]["semMarks"].map(val => val);
        while (arr.length < 8) arr.push(0);
        students.push({
            roll: `${data[i]["roll"]}`,
            name: `${data[i]["fullName"]}`,
            sgpas: arr
        });
        let array = document.cookie.split(';');
        array.forEach(value => {

            let pair = value.split('=');
            let temp = decodeURIComponent(pair[1]);
            if (temp.length > 3 && temp.slice(3, temp.length - 1) == data[i]["_id"] && !show) {
                show = true;
                fillInputs(data[i]);
            }

        })

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
            ${student.sgpas.map(sgpa => `<td><input type="number" step="0.01" min="0" max="10" value="${sgpa ? sgpa : 0}" disabled></td>`).join('')}
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
