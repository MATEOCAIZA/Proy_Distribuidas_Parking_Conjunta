import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TrimOnlyLower } from '../../common/transformers/sanitize.transformer';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(72, { message: 'La contraseña no puede superar los 72 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'La contraseña debe contener al menos una letra y un número',
  })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre de usuario no puede tener más de 50 caracteres' })
  @Matches(/^[a-z0-9._-]+$/, {
    message: 'El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos',
  })
  @TrimOnlyLower()
  username!: string;

  @IsUUID('4', { message: 'id_person debe ser un UUID v4 válido' })
  @IsNotEmpty({ message: 'El id de persona es obligatorio' })
  id_person!: string;
}