# Endpoints del Microservicio Zonas-Espacios

Este documento detalla todos los endpoints expuestos por los controladores del microservicio, incluyendo ejemplos de los formatos JSON requeridos.

---

## 📍 Zonas (`ZonaControlador`)
**Ruta Base:** `/api/v1/zonas`

| Método | Endpoint | Descripción | Parámetros / Body | Respuesta |
|---|---|---|---|---|
| `GET` | `/` | Obtiene la lista de todas las zonas. | - | `List<ZonaResponseDTO>` <br> *(Ver ejemplo abajo)* |
| `GET` | `/desocupadas` | Obtiene la lista de las zonas desocupadas. | - | `List<ZonaResponseDTO>` |
| `GET` | `/tipo/{tipo}` | Obtiene zonas filtradas por tipo. | **Path:** `tipo` <br> *(VIP, REGULAR, INTERNA, EXTERNA, PREFERENCIAL)* | `List<ZonaResponseDTO>` |
| `POST` | `/` | Crea una nueva zona. | **Body:** `ZonaRequestDTO` <br><details><summary>Ejemplo JSON</summary><pre lang="json">{<br>  "nombre": "Zona Norte A",<br>  "descripcion": "Zona principal de autos",<br>  "tipo": "REGULAR",<br>  "capacidad": 50<br>}</pre></details> | `ZonaResponseDTO` <br><details><summary>Ejemplo JSON</summary><pre lang="json">{<br>  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",<br>  "nombre": "Zona Norte A",<br>  "capacidad": 50,<br>  "codigo": "ZNA-001",<br>  "descripcion": "Zona principal de autos",<br>  "estado": 1,<br>  "tipo": "REGULAR",<br>  "fechaCreacion": "2024-05-20T10:15:30",<br>  "fechaModificacion": "2024-05-20T10:15:30",<br>  "espacios": []<br>}</pre></details> |
| `PUT` | `/{idZona}` | Actualiza una zona existente. | **Path:** `idZona` (`UUID`) <br> **Body:** `ZonaRequestDTO` <br> *(Ver POST para ejemplo JSON)* | `ZonaResponseDTO` |
| `PATCH` | `/{idZona}` | Activa o desactiva una zona (Cambio de estado lógico). | **Path:** `idZona` (`UUID`) | `204 No Content` |

---

## 🅿️ Espacios (`EspacioControlador`)
**Ruta Base:** `/api/v1/espacios`

| Método | Endpoint | Descripción | Parámetros / Body | Respuesta |
|---|---|---|---|---|
| `GET` | `/` | Obtiene la lista de todos los espacios. | - | `List<EspacioResponseDTO>` <br> *(Ver ejemplo abajo)* |
| `POST` | `/` | Crea un nuevo espacio. | **Body:** `EspacioRequestDTO` <br><details><summary>Ejemplo JSON</summary><pre lang="json">{<br>  "idZona": "3fa85f64...",<br>  "descripcion": "Espacio cubierto",<br>  "tipo": "AUTO",<br>  "estado": "DISPONIBLE"<br>}</pre></details> | `EspacioResponseDTO` <br><details><summary>Ejemplo JSON</summary><pre lang="json">{<br>  "id": "5fa85f64-...",<br>  "codigo": "ESP-A-01",<br>  "tipo": "AUTO",<br>  "descripcion": "Espacio cubierto",<br>  "estado": "DISPONIBLE",<br>  "activo": true,<br>  "idZona": "3fa85f64-...",<br>  "nombreZona": "Zona Norte A",<br>  "fechaCreacion": "2024-05-20T10:20:30",<br>  "fechaModificacion": "2024-05-20T10:20:30"<br>}</pre></details> |
| `PUT` | `/{idEspacio}` | Actualiza la información de un espacio existente. | **Path:** `idEspacio` (`UUID`) <br> **Body:** `EspacioRequestDTO` | `EspacioResponseDTO` |
| `DELETE` | `/{idEspacio}` | Elimina un espacio. | **Path:** `idEspacio` (`UUID`) | `204 No Content` |
| `POST` | `/{idEspacio}` | Actualiza únicamente el estado de un espacio. | **Path:** `idEspacio` (`UUID`) <br> **Body:** `EstadoEspacio` <br><details><summary>Ejemplo JSON</summary><pre lang="json">"OCUPADO"</pre></details> | `EspacioResponseDTO` |
| `GET` | `/estado` | Obtiene espacios filtrados por estado. | **Body:** `EstadoEspacio` <br><details><summary>Ejemplo JSON</summary><pre lang="json">"DISPONIBLE"</pre></details> | `List<EspacioResponseDTO>` |
| `GET` | `/zona-estado` | Obtiene espacios filtrados por zona y estado. | **Body:** `BusquedaZonaEstadoDTO` <br><details><summary>Ejemplo JSON</summary><pre lang="json">{<br>  "idZona": "3fa85f64...",<br>  "estado": "DISPONIBLE"<br>}</pre></details> | `List<EspacioResponseDTO>` |
| `GET` | `/tipo/{tipo}` | Obtiene espacios filtrados por su tipo. | **Path:** `tipo` <br> *(MOTO, AUTO, BUSETA)* | `List<EspacioResponseDTO>` |
| `GET` | `/zona/{idZona}/tipo/{tipo}` | Obtiene espacios filtrados por su zona y su tipo simultáneamente. | **Path:** `idZona` (`UUID`), `tipo` (`TipoEspacio`) | `List<EspacioResponseDTO>` |
| `GET` | `/zona/{idZona}` | Obtiene todos los espacios pertenecientes a una zona específica. | **Path:** `idZona` (`UUID`) | `List<EspacioResponseDTO>` |

---

### Notas Adicionales y Enums

**Valores Permitidos para Tipos y Estados:**
- `TipoZona`: `"VIP"`, `"REGULAR"`, `"INTERNA"`, `"EXTERNA"`, `"PREFERENCIAL"`
- `TipoEspacio`: `"MOTO"`, `"AUTO"`, `"BUSETA"`
- `EstadoEspacio`: `"DISPONIBLE"`, `"OCUPADO"`, `"RESERVADO"`, `"MANTENIMIENTO"`

> [!NOTE]
> **Nota sobre Endpoints `GET` con Request Body:**
> Los endpoints `GET /api/v1/espacios/estado` y `GET /api/v1/espacios/zona-estado` actualmente esperan recibir datos a través del `RequestBody`. Aunque es válido técnicamente en algunos clientes HTTP, se recomienda usar parámetros de consulta (`RequestParam`) para peticiones `GET` con el fin de seguir los estándares REST.
