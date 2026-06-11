package ec.edu.espe.zonas.datos.dtos;

import ec.edu.espe.zonas.dominio.entidades.TipoZona;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ZonaRequestDTO {
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 32, min = 1, message = "El nombre de la zona debe tener entre 1 y 32 caracteres.")
    private String nombre;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private TipoZona tipo;

    @Min(1)
    @Max(100)
    private int capacidad;

}
