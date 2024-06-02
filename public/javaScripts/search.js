let userInp = sessionStorage.getItem('res');
let sessionKey = sessionStorage.getItem('res')?.toLowerCase().trim().split(' ');

let main = document.querySelector('.main');
let res = document.querySelector('#res');

//create new Nodes on success
function createSuccessNode(objKey, objLink, objContent) {
    let newNode = document.createElement('div');
    newNode.classList.add('card');
    newNode.innerHTML =
        `
        <h2><a href="${objLink}">${objKey}</a></h2>
        <p>${objContent}</p>
    `;
    main.appendChild(newNode);
}

//create new Nodes of failure
function createFailedNode() {
    let newNode = document.createElement('div');
    newNode.classList.add('fail');
    newNode.innerHTML =
        `
            <span>No Result Is Found For: </span>
            <span>${userInp ? userInp : 'EMPTY!!'}</span>
    `;
    main.appendChild(newNode);
}

// utility to find all the keys relevant to user input
function searchKey(obj) {
    let ans = [];
    let keysArray = Object.keys(obj);
    keysArray.forEach(val => {
        sessionKey.forEach(sessionVal => {
            if (val.includes(sessionVal)) ans.push(val);
        })
    })
    return ans;
}

res.innerHTML = `Result : ${userInp ? userInp : 'Empty'}`;
if (sessionKey) {
    (
        async function () {
            let response = await fetch('/assets/searchKeyowrds/search.json');
            let data = await response.json();
            let firstKey = searchKey(data);
            if (!firstKey.length) {
                createFailedNode();
            }
            else {

                firstKey.forEach(secondKey => {
                    for (let finalKey in data[secondKey]) {
                        let finalObj = data[secondKey][finalKey];
                        let objKey = finalKey;
                        let objLink = finalObj.link;
                        let objContent = finalObj.content;
                        createSuccessNode(objKey, objLink, objContent);
                    }
                })
            }
        }
    )()
}
else {
    createFailedNode();
}
