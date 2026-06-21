import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateAutoDto, UpdateCamionetaDto, UpdateMotocicletaDto, UpdateVehiculoDto, UpdateVehiculoPipe } from './dto/update-vehiculo.dto';
import { UUID } from 'node:crypto';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) { }

  @Post()
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculosService.findOne(id);
  }

  //Endpoint clave para integraciones externas (sistema de tickets, LPR):
  //consulta por placa, no por UUID interno.
  @Get('placa/:placa')
  findByPlaca(@Param('placa') placa: string) {
    return this.vehiculosService.findByPlaca(placa);
  }

  //Vehículos asociados a una persona (gestion-usuarios), ej. "mis vehículos".
  @Get('propietario/:idPropietario')
  findByPropietario(@Param('idPropietario') idPropietario: string) {
    return this.vehiculosService.findByPropietario(idPropietario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(UpdateVehiculoPipe) updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculosService.update(id, updateVehiculoDto);
  }

  //Revierte la baja lógica (DELETE). Opcionalmente reasigna propietario,
  //ej. el vehículo fue vendido y vuelve a operar con otro dueño.
  @Patch(':id/reactivar')
  reactivar(@Param('id') id: string, @Body('idPropietario') idPropietario?: string) {
    return this.vehiculosService.reactivar(id, idPropietario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculosService.remove(id);
  }
}
