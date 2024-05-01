let back = document.querySelector('.backImg');
back.addEventListener('click', e => {
    window.location.href = ('./department.html');
})


let startIdx = 0;
let currentRow = 5;
let pageNumber = 1;
let ans = [];
let tbody = document.querySelector(".results tbody");
let thead = document.querySelector(".results thead");
let h2 = document.querySelector('.results h2');

let studentHeader = `
<th>SL. NO</th>
<th>ROLL</th>
<th>NAME</th>
<th>STREAM</th>
<th>COMPANY</th>
`;
let companyHeader = `
<th>SL. NO2</th>
<th>ROL222L</th>
<th>NAMasdfE</th>
<th>STREAfM</th>
<th>COMPA5312NY</th>
`;

function displayAns(currentRow) {
    tbody.innerHTML = '';
    for (let i = startIdx; i < Math.min(startIdx + currentRow, ans.length); i++) {
        try {
            let newNode = document.createElement('tr');
            newNode.innerHTML =
                `
            <td>${ans[i]["SL NO"]}</td>
            <td>${ans[i]["ROLL"]}</td>
            <td>${ans[i]["NAME"]}</td>
            <td>${ans[i]["STREAM"]}</td>
            <td>${ans[i]["COMPANY"]}</td>
            `;
            tbody.appendChild(newNode);
        }
        catch (err) {
            console.log(err);
        }
    }
}

async function fetchExcelData(path) {
    let res = await fetch(path)
    let data = await res.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];

    ans = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(ans);
}
let select = document.querySelector('select');
select.addEventListener('change', e => {
    currentRow = +select.value; //conver into number
    displayAns(currentRow);
})

let right = document.querySelector('#right');
let left = document.querySelector('#left');

right.addEventListener('click', () => {
    if (startIdx + currentRow < ans.length) {
        startIdx += currentRow;
        pageNumber++;
    }
    displayAns(currentRow)
});
left.addEventListener('click', () => {
    if (startIdx > 0) {
        startIdx -= currentRow;
        if (startIdx < 0) startIdx = 0;
        pageNumber--;
    }
    displayAns(currentRow)
});

let s2023 = document.querySelector('#s2023');
let r2023 = document.querySelector('#r2023');
let results = document.querySelector('.results');

s2023.addEventListener('click', e => {
    results.style.display = "flex";
    h2.innerHTML = `Placed Student Details in 2023 Batch`;
    thead.innerHTML = studentHeader;
    fetchExcelData('../assets/placement excel docs/student.xlsx').then(res => {
        displayAns(currentRow);
    })
})
r2023.addEventListener('click', e => {
    results.style.display = "flex";
    h2.innerHTML = `Valued Recruiters @2023 Batch`;
    thead.innerHTML = companyHeader;
    fetchExcelData('../assets/placement excel docs/student - Copy.xlsx').then(res => {
        displayAns(currentRow);
    })
})