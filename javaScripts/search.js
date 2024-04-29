let main = document.querySelector("main");
let message = decodeURIComponent(sessionStorage.getItem('res')).split('TEAM_BUG');
if (message && message[0] != '') {
    message.forEach((ele, idx) => {
        if (message[idx] != message[message.length - 1]) {
            let newNode = document.createElement('div');
            newNode.classList.add('content')
            newNode.innerHTML = ele;
            main.append(newNode);
        }
    })
} else {
    let newNode = document.createElement('div');
    newNode.classList.add('content')
    newNode.innerHTML = '<h2>No result is found</h2>';
    main.append(newNode)
}