import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class IngresoDto {
  @IsString()
  @IsNotEmpty({ message: 'La placa es obligatoria para registrar el ingreso' })
  placa!: string;

  // Si en el futuro el guardia/cámara identifica una zona específica
  // (ej. visitante VIP), se puede forzar; si no se manda, el gateway
  // solo valida que exista cupo del tipo de vehículo correspondiente.
  @IsOptional()
  @IsString()
  codigoZonaSolicitada?: string;

  // Permite al cliente del gateway decidir si, ante una falla de
  // comunicación con el servicio de Zonas, se debe bloquear el ingreso
  // (estricto) o permitirlo en modo degradado (por defecto: false = estricto).
  @IsOptional()
  @IsBoolean()
  permitirSinValidarCupo?: boolean;
}
