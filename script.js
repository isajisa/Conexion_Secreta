import { colores, cambioColor, colorIndice } from './colores.js';

let seleccionCarta = new Audio('sonidos/selecionarcarta.mp3');
let acertar = new Audio('sonidos/acertar.mp3');
let equivocado = new Audio('sonidos/equivocado.mp3');
let empezar = new Audio('sonidos/empezar.mp3');
let perder = new Audio('sonidos/perder.mp3');
let ganador = new Audio('sonidos/ganador.mp3');
let form = new Audio('sonidos/form.mp3');

class carta {
    constructor(valor) {
        this.valor = valor;  // Almacena el valor de la carta
        this.estado = 'oculta';  // Estado inicial de la carta (oculta)
        this.parejas = 0;
    }

    crearCarta() {
        const contenedorCartas = document.getElementById('contenedorcartas');
        this.parejas = empezarJuego.parejas;
        this.arrayCartas = [];

        // Ahora agregamos las imágenes directamente a valoresCartas
        const valoresCartas = [
            "img/cartadelante1.jpg",
            "img/cartadelante2.jpg",
            "img/cartadelante3.jpg",
            "img/cartadelante4.jpg",
            "img/cartadelante5.jpg",
        ];

        const imgatras = [
            "img/cartatrasera1.jpg",
            "img/cartatrasera2.jpg",
            "img/cartatrasera3.jpg",
            "img/cartatrasera4.jpg",
        ];

        if (this.parejas < 1 || this.parejas > 15) {
            alert('Por favor, ingrese un número de parejas entre 1 y 15.');
        } else {
            // Crear las cartas en pares
            let cartasParaJugar = [];
            for (let i = 0; i < this.parejas; i++) {
                cartasParaJugar.push(valoresCartas[i % valoresCartas.length], valoresCartas[i % valoresCartas.length]); // Añadir las imágenes en pares
            }

            // Barajar los valores de las cartas
            this.barajarCartas(cartasParaJugar);

            // Crear las cartas y agregarlas al contenedor
            for (let i = 0; i < cartasParaJugar.length; i++) {
                const newCarta = document.createElement('div');
                newCarta.classList.add('carta');

                // Crear el contenedor que tendrá las dos caras de la carta
                const cartaContenedor = document.createElement('div');
                cartaContenedor.classList.add('carta-contenedor');

                // Crear la parte trasera de la carta
                const cartaTrasera = document.createElement('div');
                cartaTrasera.classList.add('carta-trasera');

                // Crear un elemento <img> para la parte trasera
                const imagenTrasera = document.createElement('img');
                imagenTrasera.src = imgatras[formimagenes.indice];  // Ruta de la imagen trasera
                imagenTrasera.alt = "Parte trasera de la carta";  // Texto alternativo

                // Añadir la imagen al div de la parte trasera
                cartaTrasera.appendChild(imagenTrasera);

                // Crear la parte delantera de la carta
                const cartaDelantera = document.createElement('div');
                cartaDelantera.classList.add('carta-delantera');

                // Crear un elemento <img> para la parte delantera (usar la ruta de la imagen de la carta)
                const imagenDelantera = document.createElement('img');
                imagenDelantera.src = cartasParaJugar[i];  // Usamos las rutas de imagen del array
                imagenDelantera.alt = "Carta " + (i + 1);  // Texto alternativo

                // Añadir la imagen al div de la parte delantera
                cartaDelantera.appendChild(imagenDelantera);

                // Asignar un valor a la carta (en este caso, es la ruta de la imagen)
                newCarta.setAttribute('data-valor', cartasParaJugar[i]);  // Asignamos la ruta de la imagen como data-valor

                // Añadir las dos caras al contenedor de la carta
                cartaContenedor.appendChild(cartaTrasera);
                cartaContenedor.appendChild(cartaDelantera);

                // Añadir el contenedor a la carta
                newCarta.appendChild(cartaContenedor);

                // Añadir la carta al array de cartas
                this.arrayCartas.push(newCarta);

                // Añadir la carta al contenedor principal
                contenedorCartas.appendChild(newCarta);

                // Añadir el evento de flip a la carta
                newCarta.addEventListener('click', () => {
                    eJ.voltearCarta(newCarta);
                });
            }
        }
        this.voltearCartasAlInicio();
    }

    voltearCartasAlInicio() {
        // Volteamos todas las cartas al principio
        const todasLasCartas = document.querySelectorAll('.carta');
        todasLasCartas.forEach(carta => {
            carta.classList.add('flip');
        });

        // Después de 3 segundos, volvemos a poner las cartas en su estado inicial
        setTimeout(() => {
            todasLasCartas.forEach(carta => {
                carta.classList.remove('flip');
            });
        }, 2000);  // 3000 milisegundos = 3 segundos
    }

    barajarCartas(cartasParaJugar) {
        // Barajamos el array de valores utilizando el algoritmo de Fisher-Yates
        for (let i = cartasParaJugar.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartasParaJugar[i], cartasParaJugar[j]] = [cartasParaJugar[j], cartasParaJugar[i]];  // Intercambiamos los valores
        }

        // Limpiar el contenedor antes de añadir las cartas barajadas
        const contenedorCartas = document.getElementById('contenedorcartas');
        contenedorCartas.innerHTML = '';  // Limpiamos el contenedor de cartas

        // Actualizar los valores de las cartas ya existentes en el DOM
        this.arrayCartas.forEach((carta, index) => {
            carta.setAttribute('data-valor', cartasParaJugar[index]);  // Actualizamos el valor de cada carta
            const cartaContenedor = carta.querySelector('.carta-contenedor');  // Seleccionamos el contenedor de la carta
            const cartaDelantera = cartaContenedor.querySelector('.carta-delantera');  // Seleccionamos la cara delantera
            const imagenDelantera = cartaDelantera.querySelector('img');  // Seleccionamos la imagen en la parte delantera
            imagenDelantera.src = cartasParaJugar[index];  // Actualizamos la imagen de la carta delantera

            // Volvemos a agregar la carta al contenedor en el nuevo orden
            contenedorCartas.appendChild(carta);
        });
    }
}


class vida {
    constructor() {
        this.vidas = 0;  // Inicializar vidas en 0 (lo estableceremos después)
    }

    crearVida() {
        // Pedimos el número de vidas al usuario
        this.vidas = empezarJuego.vidas;

        if (this.vidas < 1 || this.vidas > 10) {
            alert('Por favor, ingrese un número de vidas entre 1 y 10.');
        } else {
            // Crear las imágenes de vidas
            const contenedorVidas = document.getElementById('contenedorvidas');
            contenedorVidas.innerHTML = '';  // Limpiar el contenedor de vidas

            // Crear las imágenes de vidas
            for (let i = 1; i <= this.vidas; i++) {
                let newVida = document.createElement('img');
                newVida.src = "img/vidas.png";  // Imagen de vida
                newVida.classList.add('vida');
                contenedorVidas.appendChild(newVida);  // Añadir cada imagen al contenedor
            }
        }
    }


    actualizarVidas() {
        // Obtener todas las imágenes de vida
        const vidasImagenes = document.querySelectorAll('.vida');

        // Actualizar la visibilidad de las imágenes según las vidas restantes
        vidasImagenes.forEach((img, index) => {
            if (index >= this.vidas) {
                img.style.display = 'none';  // Ocultar las imágenes cuando se quedan sin vidas
            } else {
                img.style.display = 'inline';  // Mostrar las imágenes de vida restantes
            }
        });
    }

    reducirVida() {
        // Reducir el número de vidas
        if (this.vidas > 0) {
            this.vidas--;
            this.actualizarVidas();  // Actualizar la visualización
        }
    }
}

class contadores {
    constructor() {
        this.porcentaje = 0;
    }

    porcentajeAciertos() {
        this.porcentaje;
        let resultadoPorcentaje = document.getElementById('porcacierto');
        this.porcentaje = Math.round((empezarJuego.correcta / empezarJuego.intentos) * 100);
        console.log(this.porcentaje + "%");
        resultadoPorcentaje.innerText = this.porcentaje;
    }
}

class temporizador {
    constructor() {
        this.tiempo = 0;
    }

    temporizador() {
        this.tiempoRestante = empezarJuego.tiempoRestante;
        let contTiempo = document.getElementById('temporizador');
        console.log("Tiempo restante: " + this.tiempoRestante);

        let temporizador = setInterval(() => {
            contTiempo.innerText = this.tiempoRestante;
            this.tiempoRestante--;  // Resta 1 segundo

            if (this.tiempoRestante < 0) {
                clearInterval(temporizador);  // Detiene el temporizador cuando llega a 0
                perder.play();
                perder.addEventListener('ended', () => {
                    empezarJuego.ganarPerder = "Has perdido!!, se acabo el tiempo.";
                    eJ.ultimaPagina();
                });
            }
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {

    empezarJuego.form.addEventListener("submit", function (event) {
        event.preventDefault();
        empezarJuego.parejas = parseInt(document.getElementById('parejasForm').value);
        empezarJuego.vidas = parseInt(document.getElementById('vidasForm').value);
        empezarJuego.tiempoRestante = parseInt(document.getElementById('tiempoForm').value);
        cC.crearCarta(event);
        cV.crearVida(event);
        temp.temporizador();
        empezarJuego.divformulario.style.display = 'none';
        empezar.play();
    });
});

class formimagenes {
    static indice = 0;

    constructor() {
        this.botoncarta1 = document.getElementById('carta1');
        this.botoncarta1.addEventListener("click", () => this.carta1());

        this.botoncarta2 = document.getElementById('carta2');
        this.botoncarta2.addEventListener("click", () => this.carta2());

        this.botoncarta3 = document.getElementById('carta3');
        this.botoncarta3.addEventListener("click", () => this.carta3());

        this.botoncarta4 = document.getElementById('carta4');
        this.botoncarta4.addEventListener("click", () => this.carta4());
    }

    carta1() {
        formimagenes.indice = 0;
        console.log("Carta 1 seleccionada");
        document.documentElement.style.setProperty("--colortema", colores[formimagenes.indice]);
        localStorage.setItem("indiceColor", formimagenes.indice);
    }

    carta2() {
        formimagenes.indice = 1;
        console.log("Carta 2 seleccionada");
        document.documentElement.style.setProperty("--colortema", colores[formimagenes.indice]);
        localStorage.setItem("indiceColor", formimagenes.indice);
    }

    carta3() {
        formimagenes.indice = 2;
        console.log("Carta 3 seleccionada");
        document.documentElement.style.setProperty("--colortema", colores[formimagenes.indice]);
        localStorage.setItem("indiceColor", formimagenes.indice);
    }

    carta4() {
        formimagenes.indice = 3;
        console.log("Carta 4 seleccionada");
        document.documentElement.style.setProperty("--colortema", colores[formimagenes.indice]);
        localStorage.setItem("indiceColor", formimagenes.indice);
    }
}

class empezarJuego {
    static correcta = 0;
    static intentos = 0;
    static puntos = 0;
    static seleccionBloqueada = false;  // Agregado para bloquear las selecciones
    static racha = 0;  // Variable para llevar la cuenta de la racha
    static maxRacha = 0;
    static ganarPerder;
    static parejas = 0;
    static vidas = 0;
    static tiempoRestante = 0;
    static divformulario;
    static form = document.getElementById("form");

    constructor() {
        empezarJuego.ganarPerder = document.getElementById('ganadoperdido');


        this.botonParametrosJuego = document.getElementById('parametrosJuego');

        if (this.botonParametrosJuego) {
            this.botonParametrosJuego.addEventListener("click", () => {
                this.parametrosJuego();
                this.botonParametrosJuego.style.display = 'none';
            });
        }

        this.botonEmpezarPartida = document.getElementById('jugar');

        if (this.botonEmpezarPartida) {
            this.botonEmpezarPartida.addEventListener("click", () => this.empezarPartida());
        }
    }

    parametrosJuego() {
        form.play();
        empezarJuego.divformulario = document.getElementById("divformulario");
        empezarJuego.divformulario.style.display = 'flex';
    }

    empezarPartida() {
        console.log("Iniciando partida...");
    }

    voltearCarta(carta) {
        // Solo voltear la carta si no está bloqueada la selección
        if (empezarJuego.seleccionBloqueada || carta.classList.contains('flip') || carta.classList.contains('daVuelta')) return;

        seleccionCarta.play();

        carta.classList.add('flip');  // Voltear la carta
        carta.classList.add('seleccionada');  // Agregar la clase seleccionada
        carta.estado = 'descubierta';  // Cambiar el estado a descubierta

        // Verificar si ya hay dos cartas volteadas
        eJ.comprobarPareja();
    }

    ultimaPagina() {
        console.log("ganadoperdido:", empezarJuego.ganarPerder);
        console.log("Puntos:", empezarJuego.puntos);
        console.log("Parejas correctas:", empezarJuego.correcta);
        console.log("Porcentaje de aciertos:", conta.porcentaje);
        console.log("Porcentaje de aciertos:", conta.porcentaje);

        const puntosFinales = empezarJuego.puntos + (empezarJuego.maxRacha * 100);

        // Guardar los resultados en el localStorage
        localStorage.setItem('ganadoperdido', empezarJuego.ganarPerder);
        localStorage.setItem('puntosfinal', puntosFinales);
        localStorage.setItem('parcorrectafinal', empezarJuego.correcta);
        localStorage.setItem('porcaciertofinal', conta.porcentaje);
        localStorage.setItem('rachaMaxima', empezarJuego.maxRacha);

        // Retrasar la redirección para asegurar que el localStorage se haya actualizado
        setTimeout(() => {
            window.location.replace("pantallafinal.html");
        }, 100); // Retrasa 100 ms
    }

    actualizarRacha() {
        // Actualizamos la racha mostrada en el HTML
        if (this.rachaContenedor) {
            this.rachaContenedor.innerText = `Racha: ${empezarJuego.racha} (Máxima: ${empezarJuego.maxRacha})`;
        }
    }

    comprobarPareja() {
        // Filtrar las cartas volteadas
        this.cartasVolteadas = document.querySelectorAll('.carta.flip');
        let parejaCorrecta = document.getElementById('parcorrecta');
        let puntaje = document.getElementById('puntos');
        let rachaActual = document.getElementById('rachaActual');
        let rachaMaxima = document.getElementById('rachaMaxima');

        // Si hay dos cartas volteadas, las comparamos
        if (this.cartasVolteadas.length === 2) {
            const carta1 = this.cartasVolteadas[0];
            const carta2 = this.cartasVolteadas[1];
            empezarJuego.intentos++;
            console.log("intentos = " + empezarJuego.intentos);

            // Bloquear la selección mientras comparamos las cartas
            empezarJuego.seleccionBloqueada = true;

            // Comparamos los valores usando 'data-valor'
            if (carta1.getAttribute('data-valor') === carta2.getAttribute('data-valor')) {
                acertar.play();
                console.log('¡Es una pareja!');
                setTimeout(() => {
                    carta1.classList.remove('flip');
                    carta2.classList.remove('flip');
                    carta1.classList.add("daVuelta");
                    carta2.classList.add("daVuelta");
                    carta1.classList.remove('seleccionada');  // Quitar la clase seleccionada
                    carta2.classList.remove('seleccionada');  // Quitar la clase seleccionada
                    empezarJuego.correcta++;
                    empezarJuego.puntos += 100;
                    console.log("puntos: " + empezarJuego.puntos);
                    console.log("respuestas correctas = " + empezarJuego.correcta);
                    parejaCorrecta.innerText = empezarJuego.correcta;
                    puntaje.innerText = empezarJuego.puntos;

                    empezarJuego.racha++;
                    rachaActual.innerText = empezarJuego.racha;
                    // Actualizar la racha máxima si es necesario
                    if (empezarJuego.racha > empezarJuego.maxRacha) {
                        empezarJuego.maxRacha = empezarJuego.racha;
                        rachaMaxima.innerText = empezarJuego.maxRacha;
                    }

                    // Mostrar la racha actual
                    this.actualizarRacha();

                    if (empezarJuego.correcta == cC.parejas) { // Compara que las cartas levantadas sean las mismas que las parejas que hay que encontrar
                        ganador.play();
                        ganador.addEventListener('ended', () => {
                            empezarJuego.ganarPerder = "Has ganado!!!";
                            eJ.ultimaPagina();
                        });
                    }
                    // Desbloquear la selección después de la comparación
                    empezarJuego.seleccionBloqueada = false;
                }, 1000);

            } else {
                equivocado.play();
                // Si no son iguales, las volvemos a dar la vuelta
                console.log('No es una pareja');
                setTimeout(() => {
                    carta1.classList.remove('flip');
                    carta2.classList.remove('flip');
                    carta1.classList.remove('seleccionada');  // Quitar la clase seleccionada
                    carta2.classList.remove('seleccionada');  // Quitar la clase seleccionada
                    carta1.estado = 'oculta';
                    carta2.estado = 'oculta';
                    cV.reducirVida();  // Reducir vida si no es pareja
                    if (cV.vidas <= 0) {
                        // Fin del juego si se quedan sin vidas
                        perder.play();
                        perder.addEventListener('ended', () => {
                            empezarJuego.ganarPerder = "Has perdido!!!";
                            eJ.ultimaPagina();
                        });
                        // Aquí puedes agregar más lógica para finalizar el juego
                    }

                    empezarJuego.racha = 0;
                    this.actualizarRacha();
                    // Desbloquear la selección después de la comparación
                    empezarJuego.seleccionBloqueada = false;
                }, 1000);  // Esperamos 1 segundo para dar la vuelta
            }
            conta.porcentajeAciertos();
        }
    }
}

const temp = new temporizador();
const conta = new contadores();
const cV = new vida();
const cC = new carta();
const eJ = new empezarJuego();
const formimg = new formimagenes();