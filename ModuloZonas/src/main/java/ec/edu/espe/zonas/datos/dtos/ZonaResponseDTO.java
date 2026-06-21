package ec.edu.espe.zonas.datos.dtos;

import ec.edu.espe.zonas.dominio.entidades.TipoZona;
import ec.edu.espe.zonas.dominio.entidades.Espacio;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ZonaResponseDTO {
    private UUID id;
    private String nombre;
    private int capacidad;
    private String codigo;
    private String descripcion;
    private int estado;
    private TipoZona tipo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private List<EspacioResponseDTO> espacios;
}
