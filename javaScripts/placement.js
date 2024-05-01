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
<th>COMPANY</th>
<th>DATE OF INTERVIEW</th>
<th>MCA</th>
<th>CSE</th>
<th>ECE</th>
<th>EIE</th>
<th>EE</th>
<th>IT</th>
<th>ME</th>
`;

//function to insert table row or student info in html
function displayStudent(currentRow) {
    thead.innerHTML = studentHeader;
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

//function to insert table row or rec info in html
function displayRec(currentRow) {
    thead.innerHTML = companyHeader;
    tbody.innerHTML = '';
    for (let i = startIdx; i < Math.min(startIdx + currentRow, ans.length); i++) {
        try {
            let newNode = document.createElement('tr');
            newNode.innerHTML =
                `
            <td>${ans[i]["COMPANY"]}</td>
            <td>${ans[i]["DATE OF INTERVIEW"]}</td>
            <td>${ans[i]["MCA"]}</td>
            <td>${ans[i]["CSE"]}</td>
            <td>${ans[i]["ECE"]}</td>
            <td>${ans[i]["EIE"]}</td>
            <td>${ans[i]["EE"]}</td>
            <td>${ans[i]["IT"]}</td>
            <td>${ans[i]["ME"]}</td>
            `;
            tbody.appendChild(newNode);
        }
        catch (err) {
            console.log(err);
        }
    }
}

//function to retreive json from excel 
async function fetchExcelData(path) {
    let res = await fetch(path)
    let data = await res.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];

    ans = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

//row number changer
let select = document.querySelector('select');
select.addEventListener('change', e => {
    currentRow = +select.value; //conver into number
    displayAns(currentRow);
})


//left right data movement
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

//store path of excel files
let studentPlacementInfo = [], recInfo = [];
//use to store excel pathes in prev arry
fetch('../assets/placement excel docs/info.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        data[0].student.forEach(val => {
            studentPlacementInfo.push(val);
        })
        data[1].recruiter.forEach(val => {
            recInfo.push(val);
        })
    })
    .catch("FAILED TO FETCH PLACEMENT JSON FILE.");



let results = document.querySelector('.results');
let getPlacementInfoParas = document.querySelectorAll('.getPlacementInfo p');

//intermidiate function or middleware to fetch data before print in html
function displayPlacementInfo(path) {
    console.log(path);
    results.style.display = "flex";
    h2.innerHTML = `Placed Student Details in 2023 Batch`;
    thead.innerHTML = studentHeader;
    fetchExcelData('../assets/placement excel docs' + path.slice(1))
        .then(res => {
            if (path.includes('rec')) {
                displayRec(currentRow);
            }
            else if (path.includes('student')) {
                displayStudent(currentRow);
            }
            else {

            }
        })
        .catch(err => console.log(err));
}

//listens click event
getPlacementInfoParas.forEach(val => {
    val.addEventListener('click', e => {
        let id = val.getAttribute('id');
        if (id.includes('s20')) {
            let idx = studentPlacementInfo.indexOf('./student' + id.slice(1) + '.xlsx');
            if (idx == -1) return;
            displayPlacementInfo(studentPlacementInfo[idx]);
        }
        else if (id.includes('r20')) {
            let idx = recInfo.indexOf('./rec' + id.slice(1) + '.xlsx');
            if (idx == -1) return;
            displayPlacementInfo(recInfo[idx]);
        }
        else {
            //wait
        }
    })
})
