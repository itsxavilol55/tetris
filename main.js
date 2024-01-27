import './style.css'
const size = 20;
const columnas = 21;
const filas = 30;
const totalWidth = size * columnas;
const totalHeight = size * filas;
let posX = 9;
let posY = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.style.width = totalWidth + "px";
canvas.style.height = totalHeight + "px";
juego();
function juego() {
    posY = 0;
    caePieza();
}
function caePieza() {
    dibuja();
    if (compara())
        return;
    const promesa = new Promise((resolve) => {
        setTimeout(() => {
            borraPieza();
            resolve();
        }, 250);
    });
    promesa.then(() => caePieza());
}
function dibuja() {
    ctx.beginPath();
    ctx.fillRect(posX * size, posY * size, size * 2, size);
}
function borraPieza() {
    ctx.clearRect(posX * size, posY * size, size * 2, size);
    posY++;
    ctx.closePath();
}
function compara() {
    if (posY * size >= canvas.height - size) {
        juego();
        return true;
    }
    return false;
}



