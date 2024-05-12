let sessionKey = sessionStorage.getItem('res').toLowerCase().trim();
let main = document.querySelector('main');

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
function createFailedNode() {
    let newNode = document.createElement('div');
    newNode.classList.add('fail');
    newNode.innerHTML =
        `
            <span>No Result is Found For: </span>
            <span>${sessionKey?sessionKey:'EMPTY!!'}</span>
    `;
    main.appendChild(newNode);
}
function searchKey(obj) {
    let ans = [];
    let keysArray = Object.keys(obj);
    keysArray.forEach(val => {
        if (val.includes(sessionKey)) ans.push(val);
    })
    return ans;
}

if (sessionKey) {
    (
        async function () {
            console.log(sessionKey)
            let response = await fetch('../assets/searchKeyowrds/search.json');
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