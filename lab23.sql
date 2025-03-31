/*
1. Store Procedure para obtener los proveedores que participaron en el proyecto 'Televisa en acción' 
pero no en 'Educando en Coahuila':
*/
DELIMITER $$

CREATE PROCEDURE ObtenerProveedoresTelevisaNoEducando()
BEGIN
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
END $$

DELIMITER ;

/*
2. Store Procedure para obtener el total a pagar por proyecto, 
considerando materiales y porcentaje de impuesto:
*/
DELIMITER $$

CREATE PROCEDURE ObtenerTotalAPagarPorProyecto()
BEGIN
    SELECT p.denominacion,
        SUM(e.cantidad * m.precio * (1 + m.porcentajeImpuesto / 100)) AS TotalAPagar
    FROM proyectos p
    JOIN entregan e ON e.numero = p.numero
    JOIN materiales m ON m.clave = e.clave
    GROUP BY p.denominacion;
END $$

DELIMITER ;

/*
3. Store Procedure para obtener el total entregado de cada material en el año 2000:

*/
DELIMITER $$

CREATE PROCEDURE ObtenerTotalEntregado2000()
BEGIN
    SELECT e.clave, m.descripcion, SUM(e.cantidad) AS TotalEntregado
    FROM entregan e
    JOIN materiales m ON e.clave = m.clave
    WHERE YEAR(e.fecha) = 2000 
    GROUP BY e.clave, m.descripcion;
END $$

DELIMITER ;

-- Ejecutamos las Store Procedures
CALL ObtenerProveedoresTelevisaNoEducando();
CALL ObtenerTotalAPagarPorProyecto();
CALL ObtenerTotalEntregado2000();