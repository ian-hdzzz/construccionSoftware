// Promedio de arreglo de numeros
function calcularPromedio(numeros) {
    if (numeros.length === 0) return 0;
    let suma = numeros.reduce((acc, num) => acc + num, 0);
    return suma / numeros.length;
}


const numeros = [10, 20, 30, 40, 50];
console.log(`El promedio es: ${calcularPromedio(numeros)}`);

const fs = require('fs');

function escribirArchivo(nombreArchivo, contenido) {
    fs.writeFile(nombreArchivo, contenido, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
        } else {
            console.log(`Archivo "${nombreArchivo}" creado exitosamente.`);
        }
    });
}

escribirArchivo('mensaje.txt', 'Hola, este es un mensaje guardado en un archivo.');

// Ejercico extra- fibonacci
function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
  }
  
  console.log(fibonacci(10)); 

// servidor
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'lab_06.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Página no encontrada');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

const PORT = 3006;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});