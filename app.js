//Variables.
asignarTextoElemento('h1', 'Juego de adivina el numero');
asignarTextoElemento('p', 'Adivina un numero del 1 al 10');

//Funciones.

function asignarTextoElemento(elemento, texto){
    let elementoHTLM = document.querySelector(elemento);
    elementoHTLM.innerHTML = texto;
}

function intentoDeUsuario(){
    
}
