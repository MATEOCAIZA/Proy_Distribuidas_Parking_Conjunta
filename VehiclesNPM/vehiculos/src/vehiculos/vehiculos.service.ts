import { Injectable } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { FactoryVehiculos } from 'src/factory.vehiculo';
import { UUID } from 'crypto';

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
      throw new Error("Ya existe un vehículo con esa placa");
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
      throw new Error("Vehiculo no encontrado");
    }
    return existe;
  }

  update(id: string, updateVehiculoDto: UpdateVehiculoDto) {
    //No se puede actualizar la placa.

    return `This action updates a #${id} vehiculo`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehiculo`;
  }
}
