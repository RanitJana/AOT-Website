document.getElementById('editButton').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });

    this.textContent = this.textContent === 'Edit' ? 'Save' : 'Edit';
    this.style.backgroundColor = this.textContent === 'Edit' ? '#28a745' : '#007bff';
});


let students = [];
let currentPage = 1;
const rowsPerPage = document.getElementById('rowNumber').value;

function generateStudents() {
    for (let i = 1; i <= 50; i++) {
        students.push({
            roll: `Roll ${i}`,
            name: `Student ${i}`,
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
    generateStudents();
    renderTable(currentPage);
    document.getElementById('rowNumber').addEventListener('change', updateTable);
});
