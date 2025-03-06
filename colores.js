export const colores = [
    "rgb(68, 150, 10)", 
    "rgb(78, 201, 206)",
    "rgb(254, 255, 9)",
    "rgb(67, 48, 78)"
];

export let colorIndice = localStorage.getItem("indiceColor") ? parseInt(localStorage.getItem("indiceColor")) : 0;

export function cambioColor() {
    colorIndice = (colorIndice + 1) % colores.length;
    paletaColores();
    localStorage.setItem("indiceColor", colorIndice);
}

function paletaColores() {
    const root = document.documentElement;
    const color = colores[colorIndice];
    root.style.setProperty("--colortema", color);
}

document.addEventListener("DOMContentLoaded", () => {
    const botoncolor = document.getElementById("botonColores");
    botoncolor.addEventListener("click", cambioColor);
    paletaColores();
});