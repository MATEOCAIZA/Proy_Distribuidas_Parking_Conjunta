import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { IngresoDto } from './dto/ingreso.dto';
import { SalidaDto } from './dto/salida.dto';
import { RegistroEIngresoDto } from './dto/registro-e-ingreso.dto';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // GET /gateway/vehiculos/ABC-1234
  // El sistema de tickets la usa para decidir si el vehículo ya está
  // registrado, y en qué estado (dentro/fuera, bloqueado o no).
  @Get('vehiculos/:placa')
  consultarVehiculo(@Param('placa') placa: string) {
    return this.gatewayService.consultarVehiculo(placa);
  }

  // POST /gateway/ingresos
  // Vehículo ya registrado que llega a la garita.
  @Post('ingresos')
  autorizarIngreso(@Body() dto: IngresoDto) {
    return this.gatewayService.autorizarIngreso(dto);
  }

  // POST /gateway/ingresos/walk-in
  // Vehículo nuevo capturado en garita: registra + autoriza en un solo paso.
  @Post('ingresos/walk-in')
  registrarEIngresar(@Body() dto: RegistroEIngresoDto) {
    return this.gatewayService.registrarEIngresar(dto);
  }

  // POST /gateway/salidas
  @Post('salidas')
  autorizarSalida(@Body() dto: SalidaDto) {
    return this.gatewayService.autorizarSalida(dto);
  }
}
