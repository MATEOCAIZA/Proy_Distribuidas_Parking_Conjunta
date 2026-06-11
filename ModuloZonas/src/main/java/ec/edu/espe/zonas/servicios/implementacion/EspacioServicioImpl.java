package ec.edu.espe.zonas.servicios.implementacion;

import ec.edu.espe.zonas.datos.dtos.EspacioRequestDTO;
import ec.edu.espe.zonas.datos.dtos.EspacioResponseDTO;
import ec.edu.espe.zonas.dominio.entidades.Espacio;
import ec.edu.espe.zonas.dominio.entidades.EstadoEspacio;
import ec.edu.espe.zonas.dominio.entidades.Zona;
import ec.edu.espe.zonas.dominio.repositorios.EspacioRepositorio;
import ec.edu.espe.zonas.dominio.repositorios.ZonaRepositorio;
import ec.edu.espe.zonas.servicios.EspacioServicio;
import ec.edu.espe.zonas.utils.UtilsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class EspacioServicioImpl implements EspacioServicio {

    private final EspacioRepositorio repositorioEspacio;
    private final ZonaRepositorio repositorioZona;
    private final UtilsMapper mapper;

    @Override
    public List<EspacioResponseDTO> obtenerEspacios() {
        return repositorioEspacio.findAll().stream() //Stream es de la información proveniente
                .map(mapper::toEspacioResponseDto) // Llama al mapeador
                .collect(Collectors.toList());
    }

    @Override
    public EspacioResponseDTO crearEspacio(EspacioRequestDTO request) {
        Zona objZona = repositorioZona.findById(request.getIdZona()).orElse(null);
        if(objZona == null) return null;


        int capacidadActualZona = objZona.getEspacios().size();

        if(capacidadActualZona < objZona.getCapacidad())
        {
            Espacio nuevoEspacio = mapper.toEntityEspacios(request);
            nuevoEspacio.setZona(objZona);
            //nuevoEspacio.setEstado(EstadoEspacio.DISPONIBLE); //
            nuevoEspacio.setActivo(true);
            nuevoEspacio.setFechaCreacion(LocalDateTime.now());

            Espacio espacioSaved = repositorioEspacio.save(nuevoEspacio);

            return mapper.toEspacioResponseDto(espacioSaved);
        }
        else//Zona llena
        {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "La zona ya está llena");

        }


    }

    @Override
    public EspacioResponseDTO actualizarEspacio(UUID idEspacio, EspacioRequestDTO request) {
        Espacio objEspacio = repositorioEspacio.findById(idEspacio).orElse(null);

        if(objEspacio == null) return null; //Espacio no encontrado

        //objEspacio.setEstado(request.getEstado());
        objEspacio.setCodigo(request.getCodigo());
        objEspacio.setDescripcion(request.getDescripcion());
        objEspacio.setTipo(request.getTipo());
        //Cambio de zona
        if(objEspacio.getZona().getId() != request.getIdZona()){
            Zona objZona = repositorioZona.findById(request.getIdZona()).orElse(null);
            if(objZona != null) objEspacio.setZona(objZona);
        };
        objEspacio.setFechaModificacion(LocalDateTime.now());

        Espacio espacioActualizado = repositorioEspacio.save(objEspacio);

        return mapper.toEspacioResponseDto(espacioActualizado);
    }

    @Override
    public void eliminarEspacio(UUID idEspacio) {
        Espacio objEspacio = repositorioEspacio.findById(idEspacio).orElse(null);

        if(objEspacio == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espacio no encontrado");
        }

        objEspacio.setActivo(false);
        repositorioEspacio.save(objEspacio);
    }

    @Override
    public EspacioResponseDTO actualizarEstado(UUID idEspacio, EstadoEspacio estado) {
        if(estado == null || idEspacio == null) return null;

        Espacio objEspacio = repositorioEspacio.findById(idEspacio).orElse(null);

        if(objEspacio == null || objEspacio.getEstado() == estado) return null;

        objEspacio.setEstado(estado);

        return mapper.toEspacioResponseDto(repositorioEspacio.save(objEspacio));
    }

    @Override
    public List<EspacioResponseDTO> obtenerEspacioPorEstado(EstadoEspacio estado) {
        return repositorioEspacio.findByEstado(estado).stream() //Stream es de la información proveniente
                .map(mapper::toEspacioResponseDto) // Llama al mapeador
                .collect(Collectors.toList());
    }

    @Override
    public List<EspacioResponseDTO> obtenerEspaciosPorZonaYEstado(UUID idZona, EstadoEspacio estado) {
        return repositorioEspacio.findByZonaAndEstado(idZona, estado).stream() //Stream es de la información proveniente
                .map(mapper::toEspacioResponseDto) // Llama al mapeador
                .collect(Collectors.toList());
    }
}
