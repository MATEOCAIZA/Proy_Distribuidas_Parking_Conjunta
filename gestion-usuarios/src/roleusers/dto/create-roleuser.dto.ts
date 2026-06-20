import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ToUpperCaseTrim } from '../../common/transformers/sanitize.transformer';

export class CreateRoleuserDto {
  @IsUUID('4', { message: 'id_user debe ser un UUID v4 válido' })
  @IsNotEmpty({ message: 'El id de usuario es obligatorio' })
  id_user!: string;

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