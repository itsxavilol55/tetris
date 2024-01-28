import './style.css'
const colores = ["#abcdef", "#7ab81a", "#fae3c7", "#1afe4a", "#a4bfea", "#987654", "#fede3a", "#e045ae", "#f02e4a"];
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
    const color = Math.round(Math.random() * (colores.length - 1));
    ctx.fillStyle = colores[color];
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
        }, 10);
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
    const pixeles = ctx.getImageData(posX * size, (posY + 1) * size, size, size);
    const arrayAux = Array.from(pixeles.data);
    for (let i = 0; i < arrayAux.length; i++) {
        if (arrayAux[i] != 0) {
            juego();
            return true;
        }
    }
    if (posY * size >= canvas.height - size) {
        juego();
        return true;
    }
    return false;
}