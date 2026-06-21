package ec.edu.espe.zonas.controladores;
import ec.edu.espe.zonas.datos.dtos.ZonaRequestDTO;
import ec.edu.espe.zonas.datos.dtos.ZonaResponseDTO;
import ec.edu.espe.zonas.dominio.entidades.TipoZona;
import ec.edu.espe.zonas.servicios.ZonaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;  
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/zonas")
@RequiredArgsConstructor //Instancia las variables que se instancien como final
//Si no tiene uri en post mapping apunta a la ruta general del controlador

public class ZonaControlador {
    private final ZonaServicio servicio;

    @GetMapping("/")
    public ResponseEntity<List<ZonaResponseDTO>> getZonas()
    {
        return ResponseEntity.ok(servicio.listarZonas());//200 si es exitoso, 500 si falla
    }

    @GetMapping("/desocupadas")
    public ResponseEntity<List<ZonaResponseDTO>> getZonasDesocupadas() {
        return ResponseEntity.ok(servicio.listarZonasDesocupadas());
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<ZonaResponseDTO>> getZonasPorTipo(@PathVariable TipoZona tipo) {
        return ResponseEntity.ok(servicio.listarZonasPorTipo(tipo));
    }

    @PostMapping("/")
    public ResponseEntity<ZonaResponseDTO> crearZona(@Valid @RequestBody ZonaRequestDTO request){
        //ZonaResponseDTO res = servicio.crearZona(request);
        // return new ResponseEntity<>(res, HttpStatus.CREATED);
        return new ResponseEntity<>(servicio.crearZona(request),HttpStatus.CREATED);
    }

    @PutMapping("/{idZona}") //Los params se extraen con PathVariable
    public ResponseEntity<ZonaResponseDTO> actualizarZona(@PathVariable UUID idZona, @Valid @RequestBody ZonaRequestDTO request){
        //ZonaResponseDTO res = servicio.crearZona(request);
        // return new ResponseEntity<>(res, HttpStatus.CREATED);
        return ResponseEntity.ok(servicio.actualizarZona(idZona, request));
    }

    @PatchMapping("/{idZona}")
    public ResponseEntity<Void> activarDesactivarZona(@PathVariable UUID idZona)
    {
        servicio.activarDesactivar(idZona);
        return ResponseEntity.noContent().build();
    }

}
