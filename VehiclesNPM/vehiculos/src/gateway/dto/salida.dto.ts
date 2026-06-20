import { IsNotEmpty, IsString } from 'class-validator';

export class SalidaDto {
  @IsString()
  @IsNotEmpty({ message: 'La placa es obligatoria para registrar la salida' })
  placa!: string;
}
