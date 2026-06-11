package ec.edu.espe.zonas.controladores;

import ec.edu.espe.zonas.datos.dtos.EspacioRequestDTO;
import ec.edu.espe.zonas.datos.dtos.EspacioResponseDTO;
import ec.edu.espe.zonas.dominio.entidades.EstadoEspacio;
import ec.edu.espe.zonas.servicios.EspacioServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/v1/espacios")
@RequiredArgsConstructor
public class EspacioControlador {
    private final EspacioServicio servicio;

    //Response Entity maneja por su cuenta los códigos HTTP
    @GetMapping("/")
    public ResponseEntity<List<EspacioResponseDTO>> getZonas()
    {
        return ResponseEntity.ok(servicio.obtenerEspacios());//200 si es exitoso, 500 si falla
    }

    @PostMapping("/")
    public ResponseEntity<EspacioResponseDTO> crearZona(@Valid @RequestBody EspacioRequestDTO request){
        //ZonaResponseDTO res = servicio.crearZona(request);
        // return new ResponseEntity<>(res, HttpStatus.CREATED);
        return new ResponseEntity<>(servicio.crearEspacio(request), HttpStatus.CREATED);
    }

    @PutMapping("/{idEspacio}")
    public ResponseEntity<EspacioResponseDTO> actualizarEspacio(@PathVariable UUID idEspacio, @Valid @RequestBody  EspacioRequestDTO request){
        return ResponseEntity.ok(servicio.actualizarEspacio(idEspacio, request));
    }

    @DeleteMapping("/{idEspacio}")
    public  ResponseEntity<Void> eliminarEspacio(UUID idEspacio){
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{idEspacio}")
    public ResponseEntity<EspacioResponseDTO> actualizarEstado(@PathVariable UUID idEspacio, @Valid @RequestBody EstadoEspacio estado){
        return ResponseEntity.ok(servicio.actualizarEstado(idEspacio,estado));
    }

    @GetMapping("/estado")
    public ResponseEntity<List<EspacioResponseDTO>> obtenerEspaciosPorEstado(@Valid @RequestBody EstadoEspacio estado){
        return ResponseEntity.ok(servicio.obtenerEspacioPorEstado(estado));
    }

    @GetMapping("/zona-estado")
    public ResponseEntity<List<EspacioResponseDTO>> obtenerEspaciosPorZonaYEstado(@Valid @RequestBody UUID idZona, @Valid @RequestBody EstadoEspacio estado){
        return ResponseEntity.ok(servicio.obtenerEspaciosPorZonaYEstado(idZona, estado));
    }


}
