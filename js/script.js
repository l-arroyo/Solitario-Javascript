// CREACIÓN DE LAS CLASES INICIALES
class carta { // la clase carta tiene tres propiedades: figura, numero y su imagen asociada
    constructor(figura, numero) {
        this.figura = figura;
        this.numero = numero;
        this.imagen = "imagenes/baraja/" + numero + "-" + figura + ".png";
    }

    // GETTERS Y SETTERS
    getFigura() {
        return this.figura;
    }
    getNumero() {
        return this.numero;
    }
    getImagen() {
        return this.imagen;
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

    // GETTERS Y SETTERS
    getCartas() {
        return this.cartas;
    }
    setCartas(cartas) {
        this.cartas = cartas;
    }

    toString() {
        return this.cartas.toString();
    }
    addCarta(carta) {
        this.cartas.push(carta);
    }
}

const figuras = ["cir", "cua", "hex", "ova"]; // solo puede haber cuatro figuras

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

// AÑADIMOS LAS CARTAS AL MAZO INICIAL Y LAS BARAJAMOS
mazo_inicial.cartas = cartas;
mazo_inicial.cartas = barajar(mazo_inicial.cartas); // barajamos el mazo inicial y lo guardamos en el mazo inicial

// FUNCIONES
function barajar(cartas) {
    let mazo_barajado = []; // creamos un arrray que contendrá las cartas barajadas
    while (cartas.length > 0) { // mientras el array de cartas original tenga cartas
        let aleatorio = Math.floor(Math.random() * cartas.length); // generamos un número aleatorio entre 0 y el número de cartas que quedan en el array de cartas original
        mazo_barajado.push(cartas[aleatorio]); // añadimos la carta que ocupa la posición aleatoria al array de cartas barajadas
        cartas.splice(aleatorio, 1); // eliminamos la carta que ocupa la posición aleatoria del array de cartas originales
    }
    return mazo_barajado; // una vez que el array de cartas originales está vacío, devolvemos el array de cartas barajadas
}

