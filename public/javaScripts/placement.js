let backImg = document.querySelector('.backImg');
backImg.addEventListener('click', e => {
    window.history.back();
})


let startIdx = 0;
let currentRow = 5;
let pageNumber = 1;
let ans = [];
let tbody = document.querySelector(".results tbody");
let thead = document.querySelector(".results thead");
let results = document.querySelector('.results');
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
    console.log(ans);
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
    results.scrollIntoView(true);
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
            <td>${ans[i]["MCA"] ? '✔' : ''}</td>
            <td>${ans[i]["CSE"] ? '✔' : ''}</td>
            <td>${ans[i]["ECE"] ? '✔' : ''}</td>
            <td>${ans[i]["EIE"] ? '✔' : ''}</td>
            <td>${ans[i]["EE"] ? '✔' : ''}</td>
            <td>${ans[i]["IT"] ? '✔' : ''}</td>
            <td>${ans[i]["ME"] ? '✔' : ''}</td>
            `;
            tbody.appendChild(newNode);
        }
        catch (err) {
            console.log(err);
        }
    }
    results.scrollIntoView(true);
}

//function to retreive json from excel 
async function fetchExcelData(path) {
    let res = await fetch(path)
    let data = await res.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];

    ans = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

//store path of excel files
let studentPlacementInfo = [], recInfo = [];
//use to store excel pathes in prev arry
fetch('/assets/placement excel docs/info.json')
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



let getPlacementInfoParas = document.querySelectorAll('.getPlacementInfo p');

//intermidiate function or middleware to fetch data before print in html
function displayPlacementInfo(path, year) {
    results.style.display = "flex";
    fetchExcelData('/assets/placement excel docs' + path.slice(1))
        .then(res => {
            if (path.includes('rec')) {
                h2.innerHTML = `Valued Recruiters @${year} Batch`;
                displayRec(currentRow);
            }
            else if (path.includes('student')) {
                h2.innerHTML = `Placed Student Details in ${year} Batch`;
                displayStudent(currentRow);
            }
            else {

            }
        })
        .catch(err => console.log(err));
}
let savePath, year;
//listens click event
getPlacementInfoParas.forEach(val => {
    val.addEventListener('click', e => {
        let id = val.getAttribute('id');
        if (id.includes('s20')) {
            let idx = studentPlacementInfo.indexOf('./student' + id.slice(1) + '.xlsx');
            if (idx == -1) return;
            savePath = studentPlacementInfo[idx];
            year = id.slice(1);
            displayPlacementInfo(studentPlacementInfo[idx], id.slice(1));
        }
        else if (id.includes('r20')) {
            let idx = recInfo.indexOf('./rec' + id.slice(1) + '.xlsx');
            if (idx == -1) return;
            savePath = recInfo[idx];
            year = id.slice(1);
            displayPlacementInfo(recInfo[idx], id.slice(1));
        }
        else {
            //wait
        }
    })
})

let select = document.querySelector('select');
select.addEventListener('change', e => {
    currentRow = +select.value; //conver into number
    if (savePath.includes('student')) {
        displayPlacementInfo(savePath, year);
    }
    else if (savePath.includes('rec')) {
        displayPlacementInfo(savePath, year);
    }
})
//left right data movement
let right = document.querySelector('#right');
let left = document.querySelector('#left');

right.addEventListener('click', () => {
    if (startIdx + currentRow < ans.length) {
        startIdx += currentRow;
        pageNumber++;
    }
    if (savePath.includes('student')) {
        displayPlacementInfo(savePath, year);
    }
    else if (savePath.includes('rec')) {
        displayPlacementInfo(savePath, year);
    }
});
left.addEventListener('click', () => {
    if (startIdx > 0) {
        startIdx -= currentRow;
        if (startIdx < 0) startIdx = 0;
        pageNumber--;
    }
    if (savePath.includes('student')) {
        displayPlacementInfo(savePath, year);
    }
    else if (savePath.includes('rec')) {
        displayPlacementInfo(savePath, year);
    }
});



//show more in companies

let images = document.querySelectorAll('.company .name');
let showMore = document.querySelector('.company .box');
let showMoreTEXT = document.querySelector('.company .box span');
let showMoreIMG = document.querySelector('.company .box img');
function decideShowMoreOrNot() {
    if (screen.width < 918) {
        images.forEach((val, idx) => {
            if (idx > 5)
                val.style.display = 'none';
        })
    }
    else {
        images.forEach((val, idx) => {
            if (idx > 5)
                val.style.display = 'grid';
        })
        showMoreTEXT.textContent = "Show More";
        showMoreIMG.style.transform = "rotate(180deg)";
    }
}
window.addEventListener('load', decideShowMoreOrNot);
showMore.addEventListener('click', () => {
    if (showMoreTEXT.textContent == 'Show More') {
        images.forEach((val, idx) => {
            if (idx > 5) {
                val.style.display = 'grid';
            }
        })
        showMoreTEXT.textContent = "Show Less";
        showMoreIMG.style.transform = "rotate(0deg)";
    }
    else {
        images.forEach((val, idx) => {
            if (idx > 5)
                val.style.display = 'none';
        })
        showMoreTEXT.textContent = "Show More";
        showMoreIMG.style.transform = "rotate(180deg)";
    }
})

//move sticky to top
let header = document.querySelector('header');
let back = document.querySelector('.back');
let stickyMove;

function resetTimeout() {
    back.style.transition = "all 0.5s ease";
    back.style.transform = 'translate(0,0%)';
    clearTimeout(stickyMove);
    stickyMove = setTimeout(() => {
        if (Math.floor(window.scrollY) > Math.floor(header.offsetHeight + back.offsetHeight)) {
            back.style.transform = 'translate(0,-100%)';
        }
    }, 3000);
    // console.log(Math.floor(window.scrollY), Math.floor(header.offsetHeight + back.offsetHeight));
}

window.addEventListener('scroll', resetTimeout);
window.addEventListener('touchstart', resetTimeout);