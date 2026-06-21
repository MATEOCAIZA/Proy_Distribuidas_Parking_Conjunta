import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ToUpperCaseTrim } from '../../common/transformers/sanitize.transformer';

export class CreateRoleuserDto {
  @ApiProperty({
    description: 'UUID v4 del usuario al que se asigna el rol',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID('4', { message: 'id_user debe ser un UUID v4 válido' })
  @IsNotEmpty({ message: 'El id de usuario es obligatorio' })
  id_user!: string;

  @ApiProperty({
    description: 'Nombre del rol a asignar en formato UPPER_SNAKE_CASE',
    example: 'ADMIN',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Matches(/^[A-Z]+(_[A-Z]+)*$/, {
    message: 'El nombre del rol solo puede contener letras y guiones bajos (ej: ADMIN, USER_MANAGER)',
  })
  @ToUpperCaseTrim()
  role_name!: string;
}