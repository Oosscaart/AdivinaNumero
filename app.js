// --- Variables globales para el estado del juego ---
let numeroSecreto = null;
let intentos = 0;
const MAX_INTENTOS = 5;

// --- Selección dinámica de elementos del DOM ---
const input = document.querySelector('.container__input');
const mensaje = document.querySelector('.texto__parrafo');
const contador = document.getElementById('contador-intentos');
const btnIntentar = document.getElementById('btnIntentar');
const btnReiniciar = document.getElementById('reiniciar');
const audioRisas = document.getElementById('audio-risas');

// --- Utilidades de UI dinámicas ---
// Muestra un mensaje en el área de texto principal
function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

// Actualiza el contador de intentos en pantalla
function actualizarContador() {
    contador.textContent = `Intentos: ${intentos}`;
}

// Habilita/deshabilita los controles según el estado del juego
function setControles(juegoActivo) {
    input.disabled = !juegoActivo;
    btnIntentar.disabled = !juegoActivo;
    btnReiniciar.disabled = juegoActivo;
}

// Muestra una X roja grande en el centro de la pantalla
function mostrarXRoja() {
    let xRoja = document.getElementById('x-roja');
    if (!xRoja) {
        xRoja = document.createElement('div');
        xRoja.id = 'x-roja';
        xRoja.textContent = '✖';
        Object.assign(xRoja.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '160px',
            color: 'red',
            zIndex: 9999,
            pointerEvents: 'none',
            userSelect: 'none',
            textShadow: '2px 2px 8px #000'
        });
        document.body.appendChild(xRoja);
    }
    xRoja.style.display = 'block';
}

// Oculta la X roja si está visible
function ocultarXRoja() {
    const xRoja = document.getElementById('x-roja');
    if (xRoja) xRoja.style.display = 'none';
}

// Lanza confetti en toda la pantalla
function lanzarConfetti() {
    if (window.confetti) {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }
        });
    }
}

// Reproduce el sonido de risas
function reproducirRisas() {
    if (audioRisas) {
        audioRisas.currentTime = 0;
        audioRisas.play();
    }
}

// --- Lógica principal del juego ---
// Inicializa o reinicia el juego
function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    intentos = 0;
    ocultarXRoja();
    input.value = '';
    mostrarMensaje('¡Bienvenido! Ingresa un número en el cuadro.');
    actualizarContador();
    setControles(true);
}

// Maneja el intento del usuario
function manejarIntento() {
    const valor = Number(input.value);
    if (!valor || valor < 1 || valor > 10) {
        mostrarMensaje('Por favor ingresa un número válido entre 1 y 10.');
        return;
    }
    intentos++;
    actualizarContador();

    if (valor === numeroSecreto) {
        mostrarMensaje('¡Acertaste!');
        setControles(false);
        lanzarConfetti();
        reproducirRisas();
    } else if (intentos >= MAX_INTENTOS) {
        mostrarMensaje(`Game Over. El número era ${numeroSecreto}`);
        setControles(false);
        mostrarXRoja();
    } else if (valor < numeroSecreto) {
        mostrarMensaje('El número es más grande');
    } else {
        mostrarMensaje('El número es más pequeño');
    }
}

// --- Eventos dinámicos ---
// Separamos la lógica de eventos para mayor claridad y reutilización
function registrarEventos() {
    btnIntentar.onclick = manejarIntento;
    btnReiniciar.onclick = iniciarJuego;
}

// --- Inicialización dinámica al cargar la página ---
// Esto asegura que todo esté listo y desacoplado
window.addEventListener('DOMContentLoaded', () => {
    iniciarJuego();
    registrarEventos();
});

/*
    Estructura dinámica y modular:
    - Se separan responsabilidades en funciones pequeñas y reutilizables.
    - Se usan selectores y referencias globales para evitar búsquedas repetidas en el DOM.
    - Los eventos se registran de forma explícita y desacoplada.
    - Se agregan utilidades para mostrar mensajes, actualizar UI y manejar efectos visuales/sonoros.
    - Esto facilita el mantenimiento, la extensión y la comprensión del código.
*/

