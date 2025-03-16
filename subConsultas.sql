/*
Película(título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco(título, año, nombre, sueldo)
Actor(nombre, dirección, telefono, fechanacimiento, sexo)
Productor(idproductor, nombre, dirección, teléfono)
Estudio(nomestudio, dirección)
*/


-- 1.- Actrices de “Las brujas de Salem”.+

SELECT A.nombre 
FROM Actor A, Elenco E
WHERE A.nombre = E.Nombre
AND A.sexo ='F' AND E.Titulo = 'Las bruja de salem'

SELECT Nombre 
FROM Actor
WHERE Sexo = 'F'
AND Nombre IN (
    SELECT Nombre 
    FROM Elenco
    WHERE Tiutlo = 'Las brujas de Salem'
)



-- 2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.
SELECT E.nombre 
FROM Actor E, Pelicula P
WHERE E.titulo = P.titulo AND E.titulo = P.titulo
AND nomestudio = 'MGM'
AND año = 1995;
-- Subconsulta
SELECT nombre 
FROM Elenco
WHERE Titulo IN (
    SELECT titulo
    FROM Pelicula
    WHERE Nomestudio = 'MGM'
    AND año = 1995
)

-- 3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).

-- 4.- Productores que han hecho más películas que George Lucas.
SELECT P.nombre COUNT(P.titulo) 
FROM productor P, peliculas Pe
WHERE P.idNombre = Pe.idNombre 
GROUP BY P.nombre
HAVING COUNT(P.titulo) > ( 
    SELECT COUNT(P.tittulo) 
    FROM productor P, peliculas Pe
    WHERE P.idNombre = Pe.idNombre 
    AND P.nombre = 'George Lucas') 
ORDER BY COUNT(Pe.Titulo) DESC

-- 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.
SELECT P.nombre
FROM Pelicula Pe, Elenco E, Productor P
WHERE Pe.titulo = E.titulo AND Pe.año = E.año
WHERE P.idproductor = Pe.idproductor
AND E.nombre = 'Sharon stone'

SELECT P.nombre
FROM Productor P, Peliculas Pe
WHERE P.idproductor = E.idproductor
AND p.titulo IN (
    SELECT E.titulo
    FROM Elenco El
    WHERE E.nombre = 'Sharon stone'
)

-- 6.- Título de las películas que han sido filmadas más de una vez

SELECT 