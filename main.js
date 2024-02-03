import './style.css';
let colores = [];
const size = 20;
const filas = 30;
const columnas = 18;
const totalWidth = size * columnas;
const totalHeight = size * filas;
let posX = 9;
let posY = 0;
let posX2 = 9;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
canvas.style.width = totalWidth + "px";
canvas.style.height = totalHeight + "px";
generaColores();
juego();
mueve();
function juego() {
    if (posY != 0) comparaLinea();
    const color = Math.round(Math.random() * (colores.length - 1));
    ctx.fillStyle = colores[color];
    posY = 0;
    posX = 9;
    posX2 = 9;
    caePieza();
}
function comparaLinea() {
    const pixeles = ctx.getImageData(0, posY * size, canvas.width, size);
    const arrayAux = Array.from(pixeles.data);
    if (!arrayAux.includes(0)) {
        const promesa = new Promise((resolve) => {
            setTimeout(() => {
                ctx.clearRect(0, posY * size, canvas.width, size);
                resolve();
            }, 100);
        });
        const imageData = ctx.getImageData(0, 0, canvas.width, posY * size);
        promesa.then(() => {
            ctx.clearRect(0, 0, canvas.width, posY * size);
            ctx.putImageData(imageData, 0, size);
        });
    }
}
function caePieza() {
    dibuja();
    if (comparaAbajo())
        return;
    const promesa = new Promise((resolve) => {
        setTimeout(() => {
            borraPieza();
            resolve();
        }, 160);
    });
    promesa.then(() => caePieza());
}
function dibuja() {
    ctx.beginPath();
    ctx.fillRect(posX * size, posY * size, size * 2, size);
}
function comparaAbajo() {
    const pixeles = ctx.getImageData(posX * size, (posY + 1) * size, size * 2, size);
    const arrayAux = Array.from(pixeles.data);
    for (let i = 0; i < arrayAux.length; i += 20) {
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
function borraPieza() {
    ctx.clearRect(posX * size, posY * size, size * 2, size);
    posY++;
    posX = posX2;
    ctx.closePath();
}
function mueve() {
    document.addEventListener("keyup", function (event) {
        const tecla = event.key;
        if (tecla == "ArrowLeft" && posX2 * size > 0 && !comparaLados(-1)) {
            posX2--;
            return;
        }
        if (tecla == "ArrowRight" && posX2 * size < canvas.width - size * 2 && !comparaLados(1)) {
            posX2++;
            return;
        }
    });
}
function comparaLados(x) {
    const pixeles = ctx.getImageData((posX2 + x) * size, (posY + 1) * size, size * 2, size);
    const arrayAux = Array.from(pixeles.data);
    for (let i = 0; i < arrayAux.length; i += 20) {
        if (arrayAux[i] != 0)
            return true;
    }
    return false;
}
function generaColores() {
    for (let index = 0; index < 30; index++) {
        let red = Math.round(Math.random() * 254) + 1;
        let green = Math.round(Math.random() * 254) + 1;
        let blue = Math.round(Math.random() * 254) + 1;
        colores.push("rgb(" + red + "," + green + "," + blue + ")");
    }
}