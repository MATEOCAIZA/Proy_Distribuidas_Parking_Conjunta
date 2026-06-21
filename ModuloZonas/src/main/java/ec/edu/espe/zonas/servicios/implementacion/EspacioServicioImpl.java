package ec.edu.espe.zonas.servicios.implementacion;

import ec.edu.espe.zonas.datos.dtos.EspacioRequestDTO;
import ec.edu.espe.zonas.datos.dtos.EspacioResponseDTO;
import ec.edu.espe.zonas.dominio.entidades.Espacio;
import ec.edu.espe.zonas.dominio.entidades.EstadoEspacio;
import ec.edu.espe.zonas.dominio.entidades.Zona;
import ec.edu.espe.zonas.dominio.repositorios.EspacioRepositorio;
import ec.edu.espe.zonas.dominio.repositorios.ZonaRepositorio;
import ec.edu.espe.zonas.servicios.EspacioServicio;
import ec.edu.espe.zonas.utils.SanitizadorTexto;
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
    private final SanitizadorTexto sanitizador;

    @Override
    public List<EspacioResponseDTO> obtenerEspacios() {
        return repositorioEspacio.findAll().stream() //Stream es de la información proveniente
                .map(mapper::toEspacioResponseDto) // Llama al mapeador
                .collect(Collectors.toList());
    }

    @Override
    public EspacioResponseDTO crearEspacio(EspacioRequestDTO request) {
        request.setDescripcion(sanitizador.escaparHtml(sanitizador.limpiarTexto(request.getDescripcion())));

        Zona objZona = repositorioZona.findById(request.getIdZona()).orElse(null);
        if(objZona == null) return null;


        int capacidadActualZona = objZona.getEspacios().size();

        if(capacidadActualZona < objZona.getCapacidad())
        {
            Espacio nuevoEspacio = mapper.toEntityEspacios(request);
            nuevoEspacio.setZona(objZona);

            // Autogenerar código del espacio
            nuevoEspacio.setCodigo(generarCodigoEspacio(objZona));

            // Default estado a DISPONIBLE si no se envió
            if (request.getEstado() != null) {
                nuevoEspacio.setEstado(request.getEstado());
            } else {
                nuevoEspacio.setEstado(EstadoEspacio.DISPONIBLE);
            }

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
        request.setDescripcion(sanitizador.escaparHtml(sanitizador.limpiarTexto(request.getDescripcion())));

        Espacio objEspacio = repositorioEspacio.findById(idEspacio).orElse(null);

        if(objEspacio == null) return null; //Espacio no encontrado

        //objEspacio.setEstado(request.getEstado());
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

    @Override
    public List<EspacioResponseDTO> buscarPorTipo(ec.edu.espe.zonas.dominio.entidades.TipoEspacio tipo) {
        return repositorioEspacio.findByTipo(tipo).stream()
                .map(mapper::toEspacioResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EspacioResponseDTO> buscarPorTipoYZona(ec.edu.espe.zonas.dominio.entidades.TipoEspacio tipo, UUID idZona) {
        return repositorioEspacio.findByTipoAndZonaId(tipo, idZona).stream()
                .map(mapper::toEspacioResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EspacioResponseDTO> buscarPorZona(UUID idZona) {
        return repositorioEspacio.findByZonaId(idZona).stream()
                .map(mapper::toEspacioResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Genera un código único para el espacio basado en la zona.
     * Formato: {ZONA_CODIGO}-{NUM} donde NUM es el siguiente número secuencial
     * dentro de la zona (ej: ZONA-REG.S-01-03 para el espacio 3 de esa zona).
     * El código se ajusta al máximo de 12 caracteres de la columna.
     */
    private String generarCodigoEspacio(Zona zona) {
        int numEspacios = zona.getEspacios().size() + 1;
        String strNum = numEspacios > 9 ? String.valueOf(numEspacios) : "0" + numEspacios;

        // Tomar el código de la zona y truncar si es necesario para que quepa en 12 chars
        // Formato: {zonaCodigo}-{num} => zonaCodigo max = 12 - 1(guion) - len(strNum)
        String codigoZona = zona.getCodigo();
        int maxLenZona = 12 - 1 - strNum.length(); // reservar espacio para "-" y el número

        if (codigoZona.length() > maxLenZona) {
            codigoZona = codigoZona.substring(0, maxLenZona);
        }

        String codigo = codigoZona + "-" + strNum;

        // Verificar unicidad y agregar sufijo si ya existe
        while (repositorioEspacio.existsByCodigo(codigo)) {
            numEspacios++;
            strNum = numEspacios > 9 ? String.valueOf(numEspacios) : "0" + numEspacios;
            codigo = codigoZona + "-" + strNum;
        }

        return codigo;
    }
}
