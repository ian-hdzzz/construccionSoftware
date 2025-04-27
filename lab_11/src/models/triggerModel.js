// models/auditModel.js
class AuditRepository {
    constructor() {
      this.audits = [];
      this.nextId = 1;
    }
  
    create(auditData) {
      const audit = {
        id: this.nextId++,
        ...auditData
      };
      this.audits.push(audit);
      console.log(`[AUDIT LOG] ${audit.action} on product ${audit.productName} by ${audit.userEmail}`);
      return audit;
    }
  
    findAll() {
      return [...this.audits];
    }
  
    // Obtener auditorías por producto
    findByProductId(productId) {
      return this.audits.filter(audit => audit.productId === productId);
    }
  
    // Obtener auditorías por usuario
    findByUser(userEmail) {
      return this.audits.filter(audit => audit.userEmail === userEmail);
    }
  }
  
  module.exports = {
    AuditRepository: new AuditRepository()
  };

//   Pregunta 1 ¿Qué utilidad tiene un trigger (ventajas)?

/* 
    Automatización de procesos sin intervención manual
    Garantizan integridad de datos y aplicación de reglas de negocio
    Facilitan auditoría y trazabilidad de cambios
    Permiten centralizar lógica evitando duplicación de código
    Ofrecen respuesta inmediata a cambios en los datos 
*/

// Pregunta 2 ¿Tipos de triggers?
/*  Por momento: Before, After, Instead of
    Por evento: Insert, Update, Delete, Select
    Por granularidad: Row-level, Statement-level
    Por arquitectura: Database, Application, Event-driven
*/ 

// Pregunta 3 ¿En que casos NO son de utilidad?
/*
    Operaciones con alto volumen de datos (degradan rendimiento)
    Lógica compleja o procesos largos
    Riesgo de dependencias circulares
    Dificultan depuración y mantenimiento
    Problemas de escalabilidad en sistemas distribuidos
    Limitada portabilidad entre diferentes sistemas
*/ 