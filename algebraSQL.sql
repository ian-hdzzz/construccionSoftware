/*¿Qupe vimos la clase pasada?
    operadores: UN(union), IN(interección), PI, SL, TETA JOIN, X, ><
    
*/

-- Operador PI - Proyección()
SELECT Clave, descripcion FROM Materiales

-- Operador Sigma - Seleccion(Aplanar la tabla)
SELECT * FROM Materiales
WHERE precio>500

-- JOIN Natural entregan >< materiales
-- Dos formas de hacerlo
-- Primera:
SELECT * FROM Materiales M, Entregan -- Esto devuelve un producto cartesiano, si no se igualan las llaves
SELECT * FROM Materiales M, Entregan E WHERE M.Clave = E.Clave --Esta es la forma correcta


-- Union 
-- Algebra relacional:
Usuarios_america u Usuarios_europa

-- SQL (dependerá del gestor de base de datos la sintaxys):
(SELECT * FROM Usuarios_america) UNION (SELECT * FROM Usuarios_europa)

-- Ejemplo
-- 1) Descripcion de los amteriales que no se han vendido
-- algebra:
-- (PI_Descripcion Materiales) - PI_Descripcion(Materiales >< Entregan)

(SELECT Descripcion FROM Materiales) MINUS (SELECT Descripcion FROM Materiales M, Entregan T WHERE M.clave = E.clave
GROUP BY M.Clave, Descripcion, Precio
HAVING SUM(Cantidad) > 1000

-- Ejercicio
/*
    Película (título, año, duración, encolor, nomestudio, idproductor)
    Elenco (título, año, nombre)
    Actor (nombre, dirección, teléfono, fechanacimiento, sexo)
    Productor (idproductor, nombre, dirección, teléfono, importeventas)
    Estudio (nomestudio, dirección)
  */

--  1) Nombre de actriz, fecha de nacimiento y título de la películas donde han sido parte del elenco mujeres (obtener sólo actrices, no actores).
-- Algebra: PI_FechaNacimiento, Nombre, Titulo(Elenco >< (SL_sexo='mujer'Actor)))
-- SQL:
SELECT nombre, fecha, titulo FROM Elenco E, Actor A WHERE A.nombre = E.nombre AND sexo = 'F';

-- 2)Títulos de películas en las que ha actuó Mike Myers en la década pasada.
-- Algebra: PI_titulo Pelicula(SL_Año>=2010 AND año <= 2020 AND SL_Nombre = 'Mike Myers' Elenco)
-- SQL: 
SELECT titulo FROM Elenco WHERE año BETWEEN  2010 AND 2019 AND E.nombre = 'Mike Myers';

-- 3)  Nombre e importe de ventas de los productores que han producido películas en las que ha actuado Tom Cruise.
-- algebra: PI_nombre,reporteVentas Productor ><(Pelicula><(SL_Nombre='Tom Cruise' Elenco))
-- SQL:
SELECT P.nombre, P.importeventas
FROM Productor P 
JOIN Pelicula Pe ON P.idProductor = Pe.idProductor
JOIN Elenco E Pe.titulo = E.titulo and Pe.año = E.año
JOIN Actor A ON e.nombre = a.nombre
WHERE A.nombre ='Tom Cruise'

-- 4) Dirección de los estudios en los que se han filmado películas con más de tres horas de duración en las que han actuado Salma Hayek o Antonio Banderas.
-- algebra: PI_Direccion(estudio><(SL_Duracion>3h Pelicula><(SL_nombre= Salma Hayek or nombre=Antonio Banderas Elenco)))
-- sql: 
SELECT Direccion 
FROM Estudio E
JOIN Pelicula Pe ON Pe.nomestudio = E.nomestudio
JOIN Elenco E ON  Pe.titulo = E.titulo and Pe.año = E.año
WHERE Pe.duracion > 3 
AND ( E.nombre = 'Antonio Banderas' OR E.nombre = 'Salma Hayek' )


-- 5) Elenco de la película "Romeo y Julieta" de la producción del año 1938.
-- algebra: PI_nombre(SL_Año= 1938 and titulo="Romeo y Julieta" Elenco)
-- SQL:
SELECT nombre 
FROM Elenco
WHERE año= 1938 AND titulo="Romeo y Julieta";

-- 6)  Nombre y teléfono de los actores que han aparecido en películas en las que el  productor ha sido George Lucas.
-- algebra: PI_Nombre, Telefono Actor><(elenco><(pelicula><(SL_nombre='George Lucas' Productor)))
-- SQL:
SELECT A.Nombre AND A.Telefono
FROM Actor
JOIN Elenco E ON A.nombre = E.nombre
JOIN Pelicula Pe ON E.titulo = Pe.titulo AND E.año = Pe.año
JOIN Productor P ON Pe.idProductor = P.idProductor
WHERE P.nombre='George Lucas'

-- 7) Nombres de los actores que han participado en películas filmadas entre 1995 y el 2000.
-- algebra: PI_Nombre(SL_año >= 1995 AND año<= 2000 Elenco)
-- SQL:
SELECT nombre FROM Elenco WHERE año BETWEEN 1995 AND 2000;

-- 8)Nombre de los productores que han filmado películas para la "Universal Pictures".
-- algebra: PI_Nombre Productor ><(Pelicula><(SL_nomestudio='Universal Pictures'))
-- SQL:
SELECT P.nombre
FROM Productor P
JOIN Pelicula Pe ON P.idProductor = Pe.idProductor
JOIN Estudio E ON E.nomestudio = P.nomestudio
WHERE E.nomestudio='Universal Pictures'

-- 9) Nombre de los actores con más 60 años de Edad que participaron en la película del "Mago de OZ".
-- algebra: PI_nombre Actor(SL_fecha> 1965 Actor><(Elenco ><(SL_titulo='Mago de OZ' Pelicula)))
-- SQL:
SELECT A.nombre
FROM Actor A
JOIN Elenco E ON A.nombre = E.nombre
JOIN Pelicula ON Elenco.titulo = Pelicula.titulo AND Elenco.año = Pelicula.año
WHERE E.titulo = 'Mago de OZ' AND A.fecha >1965

-- 10) Nombre de los productores que han trabajado tanto para los estudios "FOX" como para "MGM".
-- Algebra: R1 =  PI_Nombre Productor><(Pelicula><(SL_nomestudio = 'FOX' Estudio)))
-- R2 = PI_Nombre Productor><(Pelicula><(SL_nomestudio = 'MGM' Estudio)))
-- R1 U R2
-- SQL:
SELECT DISTINCT P.nombre 
FROM Productor P
JOIN Pelicula Pe ON P.idproductor = Pe.idProductor
JOIN Estudio E ON Pe.nomestudio = E.nomestudio
WHERE E.nomestudio = 'FOX'

INTERSECT

SELECT DISTINCT P.nombre 
FROM Productor P
JOIN Pelicula Pe ON P.idproductor = Pe.idProductor
JOIN Estudio E ON Pe.nomestudio = E.nomestudio
WHERE E.nomestudio = 'MGM'


