-- Ejercicio 1 - TELECABLE
-- Servicios(cliente, domicilio y estado , año, rentabasica 1, servicios adicionales 1, rentabasica 2, servicios adicionales 2, 
-- rentabasica 3, servicios adicionales 3, .... rentabasica 12, servicios adicionales 12)

-- 1FN (No hay atributos multivaluados ni compuestos, es decir que sean atómicos)
Servicios(cliente, domicilio, estado, año, mes, rentabasica, servicios_adicionales)

-- 2FN (Todas las columnas dependen completamente de la clave primaria, no solo de una parte de ella)
Servicios(cliente, domicilio, estado, año, mes)
PK -> cliente, domicilio, año, mes


-- 3FN (No hay dependencias transitivas (una columna no clave no depende de otra columna no clave).)
cliente(noContrato,nombre, domicilio, estado)
C1, Ian, Tec, Qro

servicios(idServicio, descripcion, tarifa)
S1, Cable, 150,

cliente_servicios(noContrato, idServicio, fecha, montoTotal)
C1, S2, 31/03/25, 200 

-- Ejercicio 2 - Una empresa de manufactura controla su producción mediante la siguiente tabla:
Producción (Código de parte, Descripción de parte, Fecha,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 3,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 3,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 3)

-- NORMALIZADA
Parte(idParte, descripcion)
Operador(noOperador, nombre)
lineasProduccion(idLinea, noLinea)
turno(idTurno, noTurno)
Producción(idParte, noOperador, idLinea, idTurno, cantidadProducida, Fecha)

-- Ejercicio 3 - Una empresa de telefonía maneja la facturación de sus servicios con la siguiente tabla:

Facturación (Nombre del cliente y  Dirección , Fecha y  Hora, Duración,
Número de teléfono de origen, Entidad federativa de origen, Ciudad de origen,
Número de teléfono de destino, Entidad federativa de destino, Ciudad de destino,
Tarifa por minuto entre ciudad de origen y ciudad de destino,
Fecha de inicio del período de facturación,
Fecha final del período de facturación)

-- NORMALIZADA
cliente(idCliente, nombreCliente, Dirección)
estado(idEstado, nombreEstado)
ciudad(idCiudad, idEstado, nombreCiudad)
telefono(idTelefono, numeroTelefono, idCiudad)
tarifa(idTarifa, idCiudadOrigen(idCiudad PK), idCiudadDestino(idCiudad PK), tarifaPM)
Facturación(idFactura, idTelefono, idTarifa, fechaHora, fechaInicio)
Llamada(idLlamada, idFactura, idTelefonoOrigen, idTelefonoDestino, idTarifa, duracion, fechaHora);
