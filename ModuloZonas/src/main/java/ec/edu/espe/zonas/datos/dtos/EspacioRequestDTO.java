package ec.edu.espe.zonas.datos.dtos;
import ec.edu.espe.zonas.dominio.entidades.EstadoEspacio;
import ec.edu.espe.zonas.dominio.entidades.TipoEspacio;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    private String codigo;

    @NotNull(message = "El id de la zona es obligatorio")
    private UUID idZona;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private TipoEspacio tipo;

    @Enumerated(EnumType.STRING)
    private EstadoEspacio estado;

}
