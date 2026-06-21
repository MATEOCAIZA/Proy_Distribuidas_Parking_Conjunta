package ec.edu.espe.zonas.datos.dtos;

import ec.edu.espe.zonas.dominio.entidades.TipoZona;
import jakarta.validation.constraints.*;
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
    @Pattern(regexp = "^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\\s-]+$", message = "El nombre solo puede contener letras, números, espacios y guiones")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String descripcion;

    @NotNull(message = "El tipo de zona es obligatorio")
    private TipoZona tipo;

    @NotNull(message = "La capacidad es obligatoria")
    @Min(1)
    @Max(100)
    private Integer capacidad;

}
