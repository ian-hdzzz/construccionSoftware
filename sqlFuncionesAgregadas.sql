/*
Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco (título, año, nombre, sueldo)
Actor (nombre, dirección, telefono, fechanacimiento, sexo)
Productor (idproductor, nombre, dirección, teléfono)
Estudio (nomestudio, dirección) */

/*El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado. */

/* El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's. */

/* Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película. */
SELECT A.Nombre, AVG(A.sueldo) AS 'promedio'
FROM Elenco E, Actor A
WHERE E.nombre = A.nombre
GROUP by A.nombre
HAVING AVG(A.sueldo) > 5000000
ORDER BY A.Nombre DESC;

/* Título y año de producción de las películas con menor presupuesto. 
(Por ejemplo, la película de Titanic se ha producido en varias veces entre la 
lista de películas estaría la producción de Titanic y el año que fue filmada con menor presupuesto). */
SELECT nombre, año, MIN(presupuesto) AS 'Presupuesto Mínimo'
FROM Pelicula
GROUP BY nombre

/*
 Mostrar el sueldo de la actriz mejor pagada.
*/

SELECT A.nombre, MAX(E.sueldo) AS 'Actriz mejor pagada'
FROM Elenco E, Actor a
WHERE E.nombre = A.nombre AND A.sexo = 'F'
GROUP BY A.nombre
ORDER BY MAX(E.sueldo) DESC
LIMIT 1;