import './style.css'
const colores = ["#abcdef", "#7ab81a", "#fae3c7", "#1afe4a", "#a4bfea", "#987654", "#fede3a", "#e045ae", "#f02e4a"];
const size = 20;
const columnas = 18;
const filas = 30;
const totalWidth = size * columnas;
const totalHeight = size * filas;
let posX = 9;
let posY = 0;
let posX2 = 9;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.style.width = totalWidth + "px";
canvas.style.height = totalHeight + "px";
juego();
mueve();
function juego() {
    const color = Math.round(Math.random() * (colores.length - 1));
    ctx.fillStyle = colores[color];
    posY = 0;
    posX = 9;
    posX2 = 9;
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
        }, 150);
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
    posX = posX2;
    ctx.closePath();
}
function compara() {
    const pixeles = ctx.getImageData(posX * size, (posY + 1) * size, size * 2, size);
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
function mueve() {
    document.addEventListener("keydown", function (event) {
        const tecla = event.key;
        if (tecla == "ArrowLeft") {
            posX2--;
            return;
        }
        if (tecla == "ArrowRight") {
            posX2++;
            return;
        }
    });
}