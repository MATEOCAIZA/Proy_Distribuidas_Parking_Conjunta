import { BadRequestException, Body, ConflictException, ForbiddenException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoVehiculo, Vehiculo } from './entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { FactoryVehiculos } from 'src/factory.vehiculo';
import { UUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { notContains, validate } from 'class-validator';

@Injectable()
export class VehiculosService {
  constructor(@InjectRepository(Vehiculo)
    private repositoryVehiculo: Repository<Vehiculo>,){
    }

  async create(createVehiculoDto: CreateVehiculoDto) {
    const existe = await this.repositoryVehiculo.findOne({
      where : {
        placa: createVehiculoDto.datos.placa
      }
    });
    if(existe)
    {
      throw new ConflictException("Ya existe un vehículo con esa placa");
    }

    const vehiculo = FactoryVehiculos.crear(createVehiculoDto);

    return this.repositoryVehiculo.save(vehiculo);

  }

  async findAll() {
    return await this.repositoryVehiculo.find();
  }

  async findOne(id: string) {
    const existe = await this.repositoryVehiculo.findOne(
      {
        where : {
          id : id
        }
      }
    );

    if(!existe){
      throw new NotFoundException("Vehiculo no encontrado");
    }
    return existe;
  }

  //Búsqueda por placa: es la forma en la que el sistema de tickets
  //identifica un vehículo (cámara LPR o digitado por el guardia),
  //nunca conoce el UUID interno.
  async findByPlaca(placa: string) {
    const existe = await this.repositoryVehiculo.findOne({
      where: { placa }
    });

    if (!existe) {
      throw new NotFoundException(`No existe un vehículo registrado con la placa ${placa}`);
    }
    return existe;
  }

  //Variante que no lanza excepción, útil cuando el gateway necesita
  //decidir entre "ya existe" vs "hay que registrarlo".
  async findByPlacaOpcional(placa: string) {
    return this.repositoryVehiculo.findOne({ where: { placa } });
  }

  //Reglas de negocio para autorizar el ingreso físico al parqueadero.
  //No emite el ticket (eso es responsabilidad del módulo de tickets),
  //solo garantiza que el estado del vehículo sea consistente.
  async marcarIngreso(vehiculo: Vehiculo) {
    if (!vehiculo.activo) {
      throw new ForbiddenException('El vehículo está bloqueado administrativamente y no puede ingresar');
    }
    if (vehiculo.estado === EstadoVehiculo.DENTRO) {
      throw new ConflictException('El vehículo ya tiene un ingreso activo registrado (no se registró su salida anterior)');
    }

    vehiculo.estado = EstadoVehiculo.DENTRO;
    vehiculo.fechaUltimoIngreso = new Date();
    return this.repositoryVehiculo.save(vehiculo);
  }

  async marcarSalida(vehiculo: Vehiculo) {
    if (vehiculo.estado === EstadoVehiculo.FUERA) {
      throw new ConflictException('El vehículo no tiene un ingreso activo: no se puede registrar la salida');
    }

    vehiculo.estado = EstadoVehiculo.FUERA;
    vehiculo.fechaUltimaSalida = new Date();
    return this.repositoryVehiculo.save(vehiculo);
  }

  async update(id: string, dto : UpdateVehiculoDto) {
    const objVehiculo = await this.findOne(id);
    const tipo = objVehiculo.obtenerTipo().toLowerCase();

    Object.assign(objVehiculo, dto);

    return this.repositoryVehiculo.save(objVehiculo);
    
    
  }

  //Baja lógica en vez de borrado físico: los tickets históricos
  //quedan referenciando este vehículo, así que nunca se elimina la fila.
  async remove(id: string) {
    const vehiculo = await this.findOne(id);

    if (vehiculo.estado === EstadoVehiculo.DENTRO) {
      throw new ConflictException('No se puede dar de baja un vehículo que está dentro del parqueadero');
    }

    vehiculo.activo = false;
    return this.repositoryVehiculo.save(vehiculo);
  }
}
