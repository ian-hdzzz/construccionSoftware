/*
Materiales(Clave, Descripción, Costo)
Proveedores(RFC, RazonSocial)
Proyectos(Numero,Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad)
*/

SELECT * FROM materiales;

SELECT * FROM materiales
WHERE clave=1000;

SELECT clave,rfc,fecha 
FROM entregan;

SELECT * FROM materiales,entregan
WHERE materiales.clave = entregan.clave;
-- Si algún material no ha se ha entregado ¿Aparecería en el resultado de esta consulta?
-- No aparecería porque no exestiría su clave en la tabla entregan

SELECT * FROM entregan,proyectos
WHERE entregan.numero <= proyectos.numero;

(SELECT * FROM entregan where clave=1450)
union
(SELECT * FROM entregan where clave=1300)
-- ¿Cuál sería una consulta que obtuviera el mismo resultado sin usar el operador Unión? Compruébalo.
-- R= SELECT * FROM entregan WHERE clave IN (1450, 1300);


-- Algebra relacional: PR{clave}(SL{numero=5001}(entregan)) IN PR{clave}(SL{numero=5018}(entregan))
/* ORACLE: 
(select clave from entregan where numero=5001)
intersect
(select clave from entregan where numero=5018)*/

-- MYSQL:
SELECT clave 
FROM entregan 
WHERE numero = 5001 
AND clave IN (SELECT clave FROM entregan WHERE numero = 5018);
-- OR
SELECT DISTINCT e1.clave
FROM entregan e1
INNER JOIN entregan e2 ON e1.clave = e2.clave
WHERE e1.numero = 5001 AND e2.numero = 5018;

-- OR

SELECT DISTINCT e1.clave
FROM entregan e1
INNER JOIN entregan e2 ON e1.clave = e2.clave
WHERE e1.numero = 5001 AND e2.numero = 5018;

-- ----------------------------------------
-- Diferencia (se ilustra con selección )
-- ORACLE:
(SELECT * FROM entregan)
MINUS
(SELECT * FROM entregan WHERE clave=1000)

-- MYSQL
SELECT * 
FROM entregan 
WHERE clave NOT IN (SELECT clave FROM entregan WHERE clave = 1000);

-- Prducto Cartesiano
SELECT * FROM entregan, materiales;

-- ¿Cómo está definido el número de tuplas de este resultado en términos del número de tuplas de entregan y de materiales?
-- El numero de dupla se define multiplicando el numero de columnas de la tabla entregan (5) y la tabla materiales (3) -> 5x3= 15


-- EJERCICIOS
-- 1) Plantea ahora una consulta para obtener las descripciones de los materiales entregados en el año 2000.
SELECT m.descripcion, e.fecha
FROM materiales m, entregan e
WHERE m.clave = e.clave 
AND YEAR(e.fecha) =2000;
-- ¿Por qué aparecen varias veces algunas descripciones de material?
-- Porque fueron entregados en diferentes fechas

-- 2) Agrega la palabra distinct inmediatamente después de la palabra select a la consulta que planteaste antes.
SELECT DISTINCT m.descripcion
FROM materiales m, entregan e
WHERE m.clave = e.clave 
AND YEAR(e.fecha) =2000;
-- ¿Qué resultado obtienes en esta ocasión?
-- 	Elimina los duplicados, mostrando solo una vez cada combinación única de descripcion 

-- 3)Obtén los números y denominaciones de los proyectos con las fechas y cantidades de sus entregas, ordenadas por número de proyecto, presentando las fechas de la más reciente a la más antigua.
SELECT p.numero, p.denominacion, e.fecha, e.cantidad
FROM proyectos p
JOIN entregan e ON p.numero = e.numero
ORDER BY p.numero ASC, e.fecha DESC;
/*
Operadores de cadena
El operador LIKE se aplica a datos de tipo cadena y se usa para buscar registros, es capaz de 
hallar coincidencias dentro de una cadena bajo un patrón dado.

También contamos con el operador comodín (%), que coincide con cualquier cadena que tenga cero 
o más caracteres. Este puede usarse tanto de prefijo como sufijo.
*/
SELECT * FROM productos where Descripcion LIKE 'Si%'
/* ¿Qué resultado obtienes?
Explica que hace el símbolo '%'.
R = Me devuelve los materiales cuya descripción incluya los alguno de los caracteres "Si"
¿Qué sucede si la consulta fuera : LIKE 'Si' ?
¿Qué resultado obtienes?
Explica a qué se debe este comportamiento.
Busca sola las descripciones que tengan especificamente la palabra "Si", y no que la invluyan en su descripcion, por eso devuelve una tabla vacia
 */

--  Operadores de concatenación
SELECT CONCAT(rfc, ': ', razonsocial) AS proveedor FROM proveedores;

-- 
SET @foo = '¿Que resultado';
SET @bar = ' ¿¿¿??? ';
SET @foo = CONCAT(@foo, ' obtienes?');
SELECT CONCAT(@foo, @bar) AS resultado;

-- EXPRESIONES REGULARES
SELECT RFC 
FROM Entregan 
WHERE RFC REGEXP '^[A-D]';

SELECT RFC 
FROM Entregan 
WHERE RFC REGEXP '^[^A]';

SELECT Numero 
FROM Entregan 
WHERE Numero LIKE '___6';

-- Operadores lógicos (ALL, ANY/SOME, BETWEEN)

SELECT Clave,RFC,Numero,Fecha,Cantidad
FROM Entregan
WHERE Numero Between 5000 and 5010;

-- EXISTS
SELECT RFC, Cantidad, Fecha, Numero
FROM `Entregan`
WHERE `Numero` BETWEEN 5000 AND 5010
  AND EXISTS (
    SELECT `RFC`
    FROM `Proveedores`
    WHERE `RazonSocial` LIKE 'La%'
      AND `Entregan`.`RFC` = `Proveedores`.`RFC`
  )

-- ¿Qué hace la consulta?
-- Muesrtra los datos de entregan que tienen un numero entre 5000 y 5010 y que estén asociados a un proveedor cuya razón social incluye un "La en ella" 
-- ¿Qué función tiene el paréntesis ( ) después de EXISTS?
-- Se usa para encerrar la subconsulta

SELECT RFC, Cantidad, Fecha, Numero
FROM `entregan`
WHERE `numero` BETWEEN 5000 AND 5010
  AND `rfc` IN (
    SELECT `rfc`
    FROM `proveedores`
    WHERE `razonsocial` LIKE 'La%'
)

-- OPERADOR NOT IN 
SELECT  RFC, Cantidad, Fecha, Numero
FROM `Entregan`  
WHERE `Numero` BETWEEN 5000 AND 5010  
  AND `RFC` NOT IN (  
    SELECT `RFC`  
    FROM `Proveedores`  
    WHERE `RazonSocial` LIKE 'La%'  
  );

-- OPERADOR NOT
SELECT * FROM proyectos  
LIMIT 2;

-- MODIFICAR TABLAS
ALTER TABLE materiales ADD PorcentajeImpuesto NUMERIC(6,2);
UPDATE materiales SET PorcentajeImpuesto = 2*clave/1000;

SELECT m.PorcentajeImpuesto, m.precio, e.cantidad, e.numero,  
       (e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto / 100)) AS ImporteTotal
FROM materiales m
JOIN entregan e ON e.clave = m.clave;

-- VISTAS (Importante: Las vistas no pueden incluir la cláusula order by.)
CREATE VIEW Vista_Entregas AS  
SELECT e.Clave, e.RFC, e.Numero, e.Fecha, e.Cantidad,  
       m.DescripciOn, m.Precio, m.PorcentajeImpuesto,  
       (e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto / 100)) AS ImporteTotal  
FROM Entregan e  
JOIN Materiales m ON e.Clave = m.Clave;

SELECT * FROM Vista_Entregas;

-- EJERCICIOS
-- 1)
SELECT m.descripcion, m.clave
FROM materiales m
JOIN entregan e ON e.clave = m.clave
JOIN proyectos p ON p.numero= e.numero
WHERE p.denominacion = 'México sin ti no estamos completos';

-- 2)
SELECT m.descripcion, m.clave, p.razonsocial
FROM materiales m
JOIN entregan e ON e.clave = m.clave
JOIN proveedores p ON p.rfc = e.rfc
WHERE p.razonsocial = 'Acme tools';
-- No existe proveedor Acme tools

-- 3)
SELECT e.rfc, AVG(e.cantidad) AS PromedioCantidad
FROM entregan e
JOIN proveedores p ON p.rfc = e.rfc
WHERE YEAR(e.fecha) =2000 
GROUP BY e.rfc
HAVING AVG(e.cantidad) >= 300;

-- 4)
SELECT e.clave, m.descripcion, SUM(e.cantidad) AS TotalEntregado
FROM entregan e
JOIN materiales m ON e.clave = m.clave
WHERE YEAR(e.fecha) =2000 
GROUP BY e.clave, m.descripcion;

-- 5)
CREATE VIEW Mas_Vendido AS  
SELECT e.clave, SUM(e.cantidad) AS TotalEntregado
FROM entregan e
WHERE YEAR(e.fecha) = 2001
GROUP BY e.clave;

SELECT clave
FROM Mas_Vendido
ORDER BY TotalEntregado DESC
LIMIT 1;

-- 6)
SELECT descripcion, clave
FROM materiales 
WHERE descripcion LIKE '%ub%'

-- 7
SELECT p.denominacion,
SUM(e.cantidad * m.precio * (1 + m.porcentajeImpuesto / 100)) AS TotalAPagar
FROM proyectos p
JOIN entregan e ON e.numero = p.numero
JOIN materiales m ON m.clave = e.clave
GROUP BY p.denominacion;

-- 8)
SELECT p.denominacion, e.rfc, pv.razonsocial
FROM proyectos p
JOIN entregan e ON e.numero = p.numero
JOIN proveedores pv ON e.rfc = pv.rfc
WHERE p.denominacion = 'Televisa en acción'
  AND e.rfc NOT IN (
    SELECT e2.rfc
    FROM entregan e2
    JOIN proyectos p2 ON e2.numero = p2.numero
    WHERE p2.denominacion = 'Educando en Coahuila'
  );
--   USANDO VISTAS
CREATE VIEW ProveedoresTelevisa AS
SELECT e.rfc, p.denominacion, pv.razonsocial
FROM proyectos p
JOIN entregan e ON e.numero = p.numero
JOIN proveedores pv ON e.rfc = pv.rfc
WHERE p.denominacion = 'Televisa en acción';

CREATE VIEW ProveedoresEducandoCoahuila AS
SELECT e.rfc
FROM proyectos p
JOIN entregan e ON e.numero = p.numero
WHERE p.denominacion = 'Educando en Coahuila';

SELECT pt.denominacion, pt.rfc, pt.razonsocial
FROM ProveedoresTelevisa pt
WHERE pt.rfc NOT IN (SELECT rfc FROM ProveedoresEducandoCoahuila);