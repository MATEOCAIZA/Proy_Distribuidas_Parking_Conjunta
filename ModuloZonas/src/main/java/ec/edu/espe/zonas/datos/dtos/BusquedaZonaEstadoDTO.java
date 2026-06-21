package ec.edu.espe.zonas.datos.dtos;

import ec.edu.espe.zonas.dominio.entidades.EstadoEspacio;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusquedaZonaEstadoDTO {
    @NotNull(message = "El id de la zona es obligatorio")
    private UUID idZona;

    @NotNull(message = "El estado es obligatorio")
    private EstadoEspacio estado;
}
