/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/
// Array de palos
let palos = ["ova", "cua", "hex", "cir"];
// Array de número de cartas
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// Desarrollo del comienzo de juego
function comenzar_juego() {
	/* Crear baraja, es decir crear el mazo_inicial. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array mazo_inicial. 
	*/

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

comenzar_juego();


/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.
	
	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:
	
	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )
	
	donde % denota la operación módulo (resto de la división entre los operadores)
	
	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14
	
	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

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

// arrancar_tiempo
/* =================== FIN TIMER Y RELOAD =================== */

/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
	Para reordenar el array puede emplearse el siguiente pseudo código:
	
	- Recorramos con i todos los elementos del array
		- Sea j un indice cuyo valor sea un número aleatorio comprendido 
			entre 0 y la longitud del array menos uno. Este valor aleatorio
			puede conseguirse, por ejemplo con la instrucción JavaScript
				Math.floor( Math.random() * LONGITUD_DEL_ARRAY );
		- Se intercambia el contenido de la posición i-ésima con el de la j-ésima
	
*/
function barajar(mazo) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
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



/**
	  En el elemento HTML que representa el tapete inicial (variable tapete_inicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function cargar_tapete_inicial(mazo) {
	/* !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */
	for (let i = 0; i < mazo.length; i++) { // Recorremos el mazo
		let carta = mazo[i]; // Carta actual
		carta.setAttribute("class", "carta tapete_inicial"); // Ajustamos la clase de la carta
		carta.style.width = "100px"; // Ajustamos el ancho de la carta
		carta.style.position = "absolute"; // Ajustamos la posición de la carta
		carta.style.top = (i * 4) + "px"; // Ajustamos la coordenada top de la carta
		carta.style.left = (i * 4) + "px"; // Ajustamos la coordenada left de la carta
		carta.setAttribute("draggable", "false"); // Ajustamos el atributo draggable de la carta
		tapete_inicial.appendChild(carta); // Añadimos la carta al tapete inicial
	}
	mazo[mazo.length - 1].setAttribute("draggable", "true"); // Solo la ultima carta debe ser draggable
	mazo[mazo.length - 1].setAttribute("ondragstart", "drag_carta(event)");

} // cargar_tapete_inicial

/*
	  Esta función debe incrementar el número correspondiente al contenido textual
		  del elemento que actúa de contador
*/
function inc_contador(contador) {
	contador.innerHTML = +contador.innerHTML + 1;
} // inc_contador

/*
	Idem que anterior, pero decrementando 
*/
function dec_contador(contador) {
	/* !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */
} // dec_contador

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function set_contador(contador, valor) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	// asignarle el valor al objeto contador
	texto = document.createTextNode(valor);
	contador.appendChild(texto);
} // set_contador




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
	tapete_sobrantes.appendChild(carta); // añadir la carta al tapete de sobrantes

	carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta

	// eliminar carta del mazo inicial y añadirla al mazo de sobrantes
	elimianda = mazo_inicial.pop();
	mazo_sobrantes.push(elimianda);

	contador_sobrantes.innerHTML = +contador_sobrantes.innerHTML + 1; // incrementar contador de sobrantes

	// poner draggable true a la carta anterior
	mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
	mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");

	actualizaMovimientos();

	/*
	console.log(mazo_inicial.length + "cartas en el mazo inicial");
	console.log(mazo_sobrantes.length + "cartas en el mazo sobrantes");
	*/
}

function dropTapeteReceptor1(event) {
	event.preventDefault(); // cancelar el comportamiento por defecto (abrir imagen)

	var data = event.dataTransfer.getData("tapete"); // obtener id de la carta
	carta = document.getElementById(data); // obtener el objeto carta con el id obtenido
	tapete_receptor1.appendChild(carta); // añadir la carta al tapete de sobrantes

	carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta

	// eliminar carta del mazo inicial y añadirla al mazo de sobrantes
	elimianda = mazo_inicial.pop();
	mazo_receptor1.push(elimianda);

	contador_receptor1.innerHTML = +contador_receptor1.innerHTML + 1; // incrementar contador de sobrantes

	// poner draggable true a la carta anterior
	mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
	mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
	actualizaMovimientos();
}

function dropTapeteReceptor2(event) {
	event.preventDefault(); // cancelar el comportamiento por defecto (abrir imagen)

	var data = event.dataTransfer.getData("tapete"); // obtener id de la carta
	carta = document.getElementById(data); // obtener el objeto carta con el id obtenido
	tapete_receptor2.appendChild(carta); // añadir la carta al tapete de sobrantes

	carta.setAttribute("class", "cartaTapete"); // cambiar la clase de la carta

	// eliminar carta del mazo inicial y añadirla al mazo de sobrantes
	elimianda = mazo_inicial.pop();
	mazo_receptor2.push(elimianda);

	contador_receptor2.innerHTML = +contador_receptor2.innerHTML + 1; // incrementar contador de sobrantes

	// poner draggable true a la carta anterior
	mazo_inicial[mazo_inicial.length - 1].setAttribute("draggable", "true");
	mazo_inicial[mazo_inicial.length - 1].setAttribute("ondragstart", "drag_carta(event)");
	actualizaMovimientos();
}



function comprueba(id, mazo_original, mazo_destino) {

	let palo = id.split("-")[1]; // el id de la carta tiene el formato numero-palo, necesitamos obtener solo el palo
	let ultima_carta_original = mazo_original[mazo_original.length - 1]; // última carta del mazo original

	// si el mazo original está vacío, y si la última carta del mazo original es la 12, se permite soltar la carta
	if (mazo_original.length == 0 && valor == 12) {
		return true;
	} else if (mazo_original.length != 0) {
		// si el mazo original no está vacío, se comprueba si la última carta del mazo original es 1 menos que la última carta del mazo destino
		let ultima_carta_destino = mazo_destino[mazo_destino.length - 1]; // última carta del mazo destino
		if (ultima_carta_original.id.split("-")[0] == ultima_carta_destino.id.split("-")[0] - 1) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}

}

function actualizaMovimientos() {
	cont_movimientos.innerHTML = +cont_movimientos.innerHTML + 1;
}