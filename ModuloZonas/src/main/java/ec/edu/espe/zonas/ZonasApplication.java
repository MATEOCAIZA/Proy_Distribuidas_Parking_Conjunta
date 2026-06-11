package ec.edu.espe.zonas;

import ec.edu.espe.zonas.datos.dtos.ZonaRequestDTO;
import ec.edu.espe.zonas.dominio.entidades.TipoZona;
import ec.edu.espe.zonas.servicios.ZonaServicio;
import ec.edu.espe.zonas.utils.UtilsMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ZonasApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(ZonasApplication.class, args);


    }

}
