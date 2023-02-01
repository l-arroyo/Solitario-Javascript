                /*===========================
                ESTRUCTURA INICIAL DEL JUEGO
                =============================*/

// CREACIÓN DE LAS CLASES INICIALES
class carta { // la clase carta tiene dos propiedades: figura y numero
    constructor(figura, numero) {
        this.figura = figura;
        this.numero = numero;
    }

    // GETTERS Y SETTERS
    getFigura() {
        return this.figura;
    }
    getNumero() {
        return this.numero;
    }
    setFigura(figura) {
        this.figura = figura;
    }
    setNumero(numero) {
        this.numero = numero;
    }

    toString() {
        return this.numero + " de " + this.figura + "s";
    }
}

class mazo { // la clase mazo tiene una propiedad: las cartas que contiene
    constructor(cartas) {
        this.cartas = [];
    }
}

const figuras = ["ovalo", "cuadrado", "hexagono", "circulo"]; // solo puede haber cuatro figuras

// CREACIÓN DE LAS CARTAS
let cartas = []; // recorremos del array de cartas
for (let i = 0; i < figuras.length; i++) { // recorremos el array de figuras
    for (let j = 1; j <= 12; j++) { // recorremos los números
        cartas.push(new carta(figuras[i], j)); // creamos una carta con cada figura y número y la añadimos al array de cartas
    }
}

// CREACIÓN DE LOS MAZOS
let mazo_inicial = new mazo();
let mazo_sobrantes = new mazo();
let mazo_receptor1 = new mazo();
let mazo_receptor2 = new mazo();
let mazo_receptor3 = new mazo();
let mazo_receptor4 = new mazo();
