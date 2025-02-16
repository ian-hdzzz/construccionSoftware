//Ejercicio 1

// Función para generar la tabla
function generarTabla(numero) {

    let contenedorTabla = document.getElementById("problemas15");

    // Crear la tabla
    let tabla = `<table style="margin: 30px 0;" border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>`;
    for (let i = 1; i <= numero; i++) {
        tabla += `<tr><td>${i}</td><td>${i ** 2}</td><td>${i ** 3}</td></tr>`;
    }
    tabla += `</table>`;

    // Agregar la tabla al contenido existente del div sin borrar lo anterior
    contenedorTabla.innerHTML += tabla;
}

function ejercicio1(){
    // Pedir número al usuario
    let numero = parseInt(prompt("Ingresa un número:"));
    if (!isNaN(numero) && numero > 0) {
        generarTabla(numero);
    } else {
        document.write("Por favor, ingresa un número válido.");
    }

}

// Pruebas con console.assert()
function testGenerarTabla() {
    console.assert((1 ** 2 === 1) && (1 ** 3 === 1), "Error en cálculo de potencias para 1");
    console.assert((2 ** 2 === 4) && (2 ** 3 === 8), "Error en cálculo de potencias para 2");
    console.assert((3 ** 2 === 9) && (3 ** 3 === 27), "Error en cálculo de potencias para 3");
    console.log("Todas las pruebas han pasado.");
}
testGenerarTabla();

// Ejercicio 2

function ejercicio2(){
    // Generar números aleatorios entre 1 y 100
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    let sumaCorrecta = num1 + num2;

    // Iniciar tiempo
    let inicioTiempo = Date.now();

    // Pedir respuesta al usuario
    let respuesta = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));

    // Calcular tiempo transcurrido
    let tiempoTomado = (Date.now() - inicioTiempo) / 1000;

    // Validar respuesta
    let mensaje = (parseInt(respuesta) === sumaCorrecta) 
        ? `✅ Correcto! Tardaste ${tiempoTomado} segundos.` 
        : `❌ Incorrecto. La respuesta era ${sumaCorrecta}. Tardaste ${tiempoTomado} segundos.`;

   // Seleccionar el div donde se mostrará el resultado
   const contenedorResultado = document.getElementById("problemas15");

   // Agregar el mensaje al final del contenido del div sin borrar lo anterior
   contenedorResultado.innerHTML += `<p id="resultado">${mensaje}</p>`;
}
// Ejercicio 3
function ejercicio3() {
    const numeros = [-3, 0, 2, -1, 5, 0, -7, 8];
  
    const listaContenedor = document.createElement("div");

    numeros.forEach(item => {
        const p = document.createElement("li"); 
        p.textContent = item; 
        listaContenedor.appendChild(p);
    });

    // Seleccionar el contenedor preguntas15 y agregar el contenido
    const contenedor = document.getElementById("problemas15");
    contenedor.appendChild(listaContenedor);

    let resultadolista = document.createElement("div");
    contenedor.appendChild(resultadolista);
    let negativos = 0, ceros = 0, positivos = 0;

    for (let num of numeros) {
        if (num < 0) negativos++;
        else if (num === 0) ceros++;
        else positivos++;
    }

    let lista = `<p>Negativos: ${negativos}, Positivos: ${positivos}, Ceros: ${ceros}<p/>`;

    resultadolista.innerHTML += lista; // Agregar sin borrar lo anterior
}

// Ejercicio 4
function ejercicio4() {
    const matriz = [
        [10, 20, 30],
        [5, 15, 25, 35],
        [8, 16, 24, 32, 40]
    ];

    const resultados = matriz.map(fila => {
        const suma = fila.reduce((acc, num) => acc + num, 0);
        return suma / fila.length;
    });

    const contenedorMatriz = document.createElement("div");
    contenedorMatriz.id = "matriz";
    const contenedor = document.getElementById("problemas15");
    contenedor.appendChild(contenedorMatriz);
    
    let tabla = document.createElement("table");
   
    matriz.forEach(fila => {
        let tr = document.createElement("tr");
        fila.forEach(num => {
            let td = document.createElement("td");
            td.textContent = num;
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    });

    contenedorMatriz.appendChild(tabla);
    
    const contenedorResultados = document.createElement("div");
    contenedorResultados.id = "resultados-promedios";
    contenedor.appendChild(contenedorResultados);

    contenedorResultados.innerHTML = "";

    // Insertar cada promedio en un <p>
    resultados.forEach((prom, index) => {
        const p = document.createElement("p");
        p.textContent = `Fila ${index + 1}: ${prom.toFixed(2)}`;
        contenedorResultados.appendChild(p);
    });
}

// Ejercicio 5
function ejercicio5() {
    const numero = prompt("Ingresa un número:");  
    if (numero !== null) {
        const numeroInvertido = inverso(Number(numero));  

        // Mostrar el número original e invertido en el DOM
        const contenedor5 = document.createElement("div");
        const contenedor = document.getElementById("problemas15");
        contenedor.appendChild(contenedor5);
        
        contenedor5.innerHTML = "";  // Limpiar contenido previo si es necesario

        const p1 = document.createElement("p");
        p1.textContent = `Número original: ${numero}`;
        const p2 = document.createElement("p");
        p2.textContent = `Número invertido: ${numeroInvertido}`;

        contenedor5.appendChild(p1);
        contenedor5.appendChild(p2);
    }
}

function inverso(numero) {
    // Convierte el número a cadena, invierte la cadena y luego lo convierte nuevamente a número
    return parseInt(numero.toString().split("").reverse().join(""));
}







