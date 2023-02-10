/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/
// Array de palos
let palos = ["ova", "cua", "hex", "cir"];
// Array de número de cartas
let numeros = [ 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
//let numeros = [9, 10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes				
let tapete_inicial = document.getElementById("inicial");
let tapete_sobrantes = document.getElementById("sobrantes");
let tapete_receptor1 = document.getElementById("receptor1");
let tapete_receptor2 = document.getElementById("receptor2");
let tapete_receptor3 = document.getElementById("receptor3");
let tapete_receptor4 = document.getElementById("receptor4");

// Mazos
let mazo_inicial = [];
let mazo_sobrantes = [];
let mazo_receptor1 = [];
let mazo_receptor2 = [];
let mazo_receptor3 = [];
let mazo_receptor4 = [];

// Contadores de cartas
let cont_inicial = document.getElementById("contador_inicial");
let cont_sobrantes = document.getElementById("contador_sobrantes");
let cont_receptor1 = document.getElementById("contador_receptor1");
let cont_receptor2 = document.getElementById("contador_receptor2");
let cont_receptor3 = document.getElementById("contador_receptor3");
let cont_receptor4 = document.getElementById("contador_receptor4");
let cont_movimientos = document.getElementById("contador_movimientos");

// Tiempo - timer cuando cargue la página
let cont_tiempo = document.getElementById("cont_tiempo"); // span cuenta tiempo
let segundos = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador


/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/


// ==================== FUNCION QUE INICIA EL MAZO, TIMER Y CONTADORES ====================
function comenzar_juego() {

	/** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	for (let i = 0; i < palos.length; i++) { // recorremos el array de palos
		for (let j = 0; j < numeros.length; j++) { // recorremos el array de numeros
			let carta = document.createElement("img"); // creamos la carta
			carta.src = "imagenes/baraja/" + numeros[j] + "-" + palos[i] + ".png"; // le asignamos la ruta de la imagen combinando el numero y el palo
			mazo_inicial.push(carta); // añadimos la carta al mazo
			carta.id = numeros[j] + "-" + palos[i]; // le asignamos un id a la carta
			console.log(carta.id);
		}
	}

	// Barajar el mazo_inicial
	mazo_inicial = barajar(mazo_inicial);

	// Dejar mazo_inicial en tapete inicial
	cargar_tapete_inicial(mazo_inicial);

	// Puesta a cero de contadores de mazos
	set_contador(cont_sobrantes, 0);
	set_contador(cont_receptor1, 0);
	set_contador(cont_receptor2, 0);
	set_contador(cont_receptor3, 0);
	set_contador(cont_receptor4, 0);
	set_contador(cont_movimientos, 0);

	// Arrancar el conteo de tiempo
	arrancar_tiempo();

} // comenzar_juego

// ==================== FIN FUNCION QUE INICIA EL MAZO, TIMER Y CONTADORES ====================

comenzar_juego();

/* =================== TIMER Y RELOAD =================== */
function reiniciar() {
	window.location.reload();
}


var cInterval;
function arrancar_tiempo() {
	var segundos = 0;
	/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
	cInterval = window.setInterval(function () {
		let seg = Math.trunc(segundos % 60);
		let min = Math.trunc((segundos % 3600) / 60);
		let hor = Math.trunc((segundos % 86400) / 3600);
		let tiempo = ((hor < 10) ? "0" + hor : "" + hor)
			+ ":" + ((min < 10) ? "0" + min : "" + min)
			+ ":" + ((seg < 10) ? "0" + seg : "" + seg);
		document.getElementById("contador_tiempo").innerHTML = tiempo;
		segundos++;
	}, 1000);
};

/* =================== FIN TIMER Y RELOAD =================== */

// ==================== BARAJAR MAZO ====================

function barajar(mazo) {
	let mazo_barajado = []; // Array que contendrá el mazo barajado
	while (mazo.length > 0) { // Mientras el mazo no esté vacío
		let i = Math.floor(Math.random() * mazo.length); // Carta aleatoria del mazo
		mazo_barajado.push(mazo[i]); // Añadimos la carta al mazo barajado
		mazo.splice(i, 1); // Eliminamos la carta del mazo original
	}
	mazo = mazo_barajado; // Asignamos el mazo barajado al mazo original
	//asignar al ultimo elemento del mazo la la funcion drag_carta
	return mazo;
} // barajar

// ==================== FIN BARAJAR MAZO ====================

// ==================== CARGAR MAZO INICIAL EN TAPETE ====================

function cargar_tapete_inicial(mazo) {
	/* !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */
	for (let i = 0; i < mazo.length; i++) { // Recorremos el mazo
		(function(i) {
			setTimeout(function() {
				let carta = mazo[i]; // Carta actual
				carta.setAttribute("class", "carta tapete_inicial"); // Ajustamos la clase de la carta
				carta.style.width = "100px"; // Ajustamos el ancho de la carta
				carta.style.position = "absolute"; // Ajustamos la posición de la carta
				carta.style.top = ((i+2) * 3.8) + "px"; // Ajustamos la coordenada top de la carta
				carta.style.left = ((i+2) * 4.5) + "px"; // Ajustamos la coordenada left de la carta
				carta.setAttribute("draggable", "false"); // Ajustamos el atributo draggable de la carta
				tapete_inicial.appendChild(carta); // Añadimos la carta al tapete inicial
				
				if (i === mazo.length - 1) { // Solo la última carta debe ser draggable
					carta.setAttribute("draggable", "true");
					carta.setAttribute("ondragstart", "drag_carta(event)");
				}
			}, i * 30); // 1000ms = 1 second
		})(i);
	}
	
	mazo[mazo.length - 1].setAttribute("draggable", "true"); // Solo la ultima carta debe ser draggable
	mazo[mazo.length - 1].setAttribute("ondragstart", "drag_carta(event)");

} // cargar_tapete_inicial

// ==================== FIN CARGAR MAZO INICIAL EN TAPETE ====================

function set_contador(contador, valor) {
	// asignarle el valor al objeto contador
	texto = document.createTextNode(valor);
	contador.appendChild(texto);
} // set_contador

function actualizaContadores() {
	cont_movimientos.innerHTML = +cont_movimientos.innerHTML + 1;
	contador_inicial.innerHTML = mazo_inicial.length;
	contador_sobrantes.innerHTML = mazo_sobrantes.length;
	contador_receptor1.innerHTML = mazo_receptor1.length;
	contador_receptor2.innerHTML = mazo_receptor2.length;
	contador_receptor3.innerHTML = mazo_receptor3.length;
	contador_receptor4.innerHTML = mazo_receptor4.length;
}

// FUNCIONES ARRASTRAR CARTA, SOLTAR CARTA Y PERMITIR SOLTAR CARTA
function drag_carta(event) {
	event.dataTransfer.setData("tapete", event.target.id);
}

function allowDrop(event) {
	event.preventDefault(); // cancelar el comportamiento por defecto
}

function dropSobrantes(event) {

	event.preventDefault(); // cancelar el comportamiento por defecto (abrir imagen)
	var data = event.dataTransfer.getData("tapete"); // obtener id de la carta
	carta = document.getElementById(data); // obtener el objeto carta con el id obtenido
	if(carta.getAttribute("class") == "cartaTapete") {} else {
		tapete_sobrantes.appendChild(carta); // añadir la carta al tapete de sobrantes

		carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta

		// eliminar carta del mazo inicial y añadirla al mazo de sobrantes
		eliminada = mazo_inicial.pop();
		mazo_sobrantes.push(eliminada);

		actualizaContadores();
		if (actualizaMovimientos() == true) {

			// poner draggable true a la carta anterior
			mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
			mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
		}
	}

}

// ==================== FUNCION QUE PERMITE DROPEAR LAS CARTAS EN LOS TAPETES ====================

function dropTapete(objetoTapete, event) {
	event.preventDefault(); // cancelar el comportamiento por defecto (abrir imagen)
	var data = event.dataTransfer.getData("tapete"); // obtener id de la carta
	carta = document.getElementById(data); // obtener el objeto carta con el id obtenido
	switch (objetoTapete.id) { // obtener el id del objeto tapete
		case "receptor1":
			if (compruebaNumero(carta, mazo_receptor1) && compruebaColor(carta, mazo_receptor1)) {
				tapete_receptor1.appendChild(carta); // añadir la carta al tapete receptor 1
				carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta
				transferirCarta(carta, mazo_receptor1);

				if(mazo_inicial.length == 0){
					if(mazo_sobrantes.length == 0){
						victoria();
					} else {
						rebarajar();
					}
				} else {
					mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
					mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
				}
				
				actualizaContadores();
			}
		break;
		case "receptor2":
			if (compruebaNumero(carta, mazo_receptor2) && compruebaColor(carta, mazo_receptor2)) {
				tapete_receptor2.appendChild(carta); // añadir la carta al tapete receptor 2
				carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta
				transferirCarta(carta, mazo_receptor2);

				if(mazo_inicial.length == 0){
					if(mazo_sobrantes.length == 0){
						victoria();
					} else {
						rebarajar();
					}
				} else {
					mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
					mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
				}

				actualizaContadores();
			}
		break;
		case "receptor3":
			if (compruebaNumero(carta, mazo_receptor3) && compruebaColor(carta, mazo_receptor3)) {
				tapete_receptor3.appendChild(carta); // añadir la carta al tapete receptor 3
				carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta
				transferirCarta(carta, mazo_receptor3);

				if(mazo_inicial.length == 0){
					if(mazo_sobrantes.length == 0){
						victoria();
					} else {
						rebarajar();
					}
				} else {
					mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
					mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
				}

				actualizaContadores();
			}
		break;
		case "receptor4":
			if (compruebaNumero(carta, mazo_receptor4) && compruebaColor(carta, mazo_receptor4)) {
				tapete_receptor4.appendChild(carta); // añadir la carta al tapete receptor 4
				carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta
				transferirCarta(carta, mazo_receptor4);

				if(mazo_inicial.length == 0){
					if(mazo_sobrantes.length == 0){
						victoria();
					} else {
						rebarajar();
					}
				} else {
					mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
					mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
				}

				actualizaContadores();
			}
		break;
	}

}

// ==================== FIN FUNCION QUE PERMITE DROPEAR LAS CARTAS EN LOS TAPETE ====================

// ==================== FUNCION QUE COMPRUEBA SI LA CARTA ES CORRESPONDIENTE ====================

function compruebaNumero(carta, mazo_destino) {
	numero = carta.id.split("-")[0]; // el id de la cartga tiene el formato numero-palo, así que hacemos un split para obtener el numero

	if (mazo_destino.length == 0) { // si el mazo destino está vacío
		if (numero == 12) { // el numero de la carta debe ser 12
			return true;
		} else {
			return false;
		}
	} else if (mazo_destino.length != 0) { // si el mazo destino no está vacío
		if (numero == mazo_destino[mazo_destino.length - 1].id.split("-")[0] - 1) { // el numero de la carta debe ser el numero de la carta anterior - 1
			return true;
		} else {
			return false;
		}
	}
}

function compruebaColor(carta, mazo_destino) {

	if(mazo_destino.length != 0) { // si el mazo destino no está vacío

		figuraCarta = carta.id.split("-")[1]; // el id de la carta tiene el formato numero-palo, así que hacemos un split para obtener el palo
	
		if (figuraCarta == "cir" || figuraCarta == "hex") { // si la figura de la carta es un circulo o un hexagono
			figuraCarta = "gris" // la figura de la carta es gris
		} else { // si la figura de la carta es un cuadrado o un rombo
			figuraCarta = "naranja" // la figura de la carta es naranja
		}

		figuraAnterior = mazo_destino[mazo_destino.length - 1].id.split("-")[1]; // el id de la carta anterior tiene el formato numero-palo, así que hacemos un split para obtener el palo
		
		if (figuraAnterior == "cir" || figuraAnterior == "hex") { // si la figura de la carta anterior es un circulo o un hexagono
			figuraAnterior = "gris" // la figura de la carta anterior es gris
		} else { // si la figura de la carta anterior es un cuadrado o un rombo
			figuraAnterior = "naranja" // la figura de la carta anterior es naranja
		}

		if ((figuraCarta == "gris" && figuraAnterior == "naranja") || (figuraCarta == "naranja" && figuraAnterior == "gris")) { // si la figura de la carta es diferente a la figura de la carta anterior
			return true;
		} else {
			return false;
		}
	} else { // si el mazo destino está vacío, no importa el color
		return true;
	}


}

// ==================== FIN FUNCION QUE COMPRUEBA SI LA CARTA ES CORRESPONDIENTE ====================

// ==================== FUNCION PARA ACTUALIZAR CONTADOR DESDE TAPETE INICIAL O SOBRANTES ====================

function transferirCarta(carta, tapete) {
	carta.setAttribute("draggable", "false"); // poner draggable false a la carta
	// detectamos desde que mazo viene la carta
	if (mazo_inicial[mazo_inicial.length - 1].id == carta.id) {
		// eliminar carta del mazo inicial y añadirla al mazo receptor 1
		elimianda = mazo_inicial.pop();
		tapete.push(elimianda);
	} else if (mazo_sobrantes[mazo_sobrantes.length - 1].id == carta.id) {
		// eliminar carta del mazo sobrantes y añadirla al mazo receptor 1
		elimianda = mazo_sobrantes.pop();
		tapete.push(elimianda);
	}
}

function actualizaMovimientos() {
	// Comprobamos si quedan cartas en el mazo inicial
	if (mazo_inicial.length == 0 && mazo_sobrantes.length == 0) { // si no quedan cartas en el mazo inicial ni en el mazo sobrantes
		alert("¡Has ganado la partida en " + cont_movimientos.innerHTML + " movimientos!");
	} else if (mazo_inicial.length == 0 && mazo_sobrantes.length != 0) { // si no quedan cartas en el mazo inicial pero si en el mazo sobrantes
		rebarajar(); // rebarajamos
	} else if (mazo_inicial.length != 0) { // si quedan cartas en el mazo inicial
		return true; // no hacemos nada
	}
}

function rebarajar() {
	mazo_inicial = barajar(mazo_sobrantes);
	mazo_sobrantes = [];
	cargar_tapete_inicial(mazo_inicial);
	actualizaContadores();
}

function victoria() {
	alert("¡Has ganado la partida en " + cont_movimientos.innerHTML + " movimientos!");
	window.location.reload();
}