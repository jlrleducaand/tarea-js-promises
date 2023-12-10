// let btnDetener = document.getElementById("detener");





let repeticion = 1,
    interval;

interval = setInterval( () => {
    document.getElementById("intervalo").innerHTML = `<h1>${repeticion}</h1>`;
    repeticion++;
    if(repeticion >=10) {
        clearInterval(interval)
    }
},1000);













// btnDetener.addEventListener('click', () => {
//     clearInterval(interval);
// });
