package ec.edu.espe.zonas.datos.dtos;
import ec.edu.espe.zonas.dominio.entidades.EstadoEspacio;
import ec.edu.espe.zonas.dominio.entidades.TipoEspacio;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EspacioRequestDTO {

    @NotNull(message = "El id de la zona es obligatorio")
    private UUID idZona;

    @Size(max = 128, message = "La descripción no puede superar los 128 caracteres")
    private String descripcion;

    @NotNull(message = "El tipo de espacio es obligatorio")
    private TipoEspacio tipo;

    // Estado es opcional en creación — default DISPONIBLE se asigna en el servicio
    private EstadoEspacio estado;

}
