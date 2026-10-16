# Jaume Tur

- Repositorio portfolio en GitHub aqui: / https://jautur.github.io/portfolio/

## Arquitectura de Despliegue: Disparador y Ejecutor

[Origen] ──(Detecta)──> [Disparador] ──(Payload JSON)──> [Ejecutor] ──(Acción)──> [Destino]

---

### Evento Disparador (Trigger)

Función: Detecta un cambio de estado o condición específica y emite una señal.Mecanismo: Captura el evento y genera una carga útil (payload JSON) con los datos del cambio.Ejemplos: Subida de un archivo a S3, un Webhook de GitHub (git push), una alerta de métricas o un CRON programado.

### Servicio Ejecutor (Executor)

Función: Recibe el payload, procesa la lógica de negocio y realiza el trabajo técnico.Mecanismo: Arquitectura Serverless (FaaS) o microservicios que escalan horizontalmente bajo demanda.Propiedades: Debe ser idempotente (procesar el mismo evento varias veces sin duplicar errores) y reactivo.
