import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateVehiculoDto } from '../../vehiculos/dto/create-vehiculo.dto';

// Reutiliza exactamente las mismas validaciones del CRUD de vehículos
// (placa, formato por tipo, año, etc.) para no duplicar reglas de negocio.
// Esto asume que en garita se captura el dato completo del vehículo
// (formulario rápido del guardia, o integración con un sistema externo
// de matriculación). Si el negocio decide permitir un registro con datos
// mínimos, eso implica relajar las columnas NOT NULL de la entidad
// Vehiculo (marca/modelo/color/año) y se debe definir aparte.
export class RegistroEIngresoDto {
  @ValidateNested()
  @Type(() => CreateVehiculoDto)
  vehiculo!: CreateVehiculoDto;

  @IsOptional()
  @IsString()
  codigoZonaSolicitada?: string;

  @IsOptional()
  @IsBoolean()
  permitirSinValidarCupo?: boolean;
}
