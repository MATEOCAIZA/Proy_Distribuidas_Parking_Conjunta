import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'last_login debe ser una fecha válida en formato ISO 8601' })
  last_login?: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(255, { message: 'La contraseña no puede superar los 255 caracteres' })
  password_hash!: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre de usuario no puede tener más de 50 caracteres' })
  @Matches(/^[A-Za-z0-9._-]+$/, {
    message: 'El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos',
  })
  username!: string;

  @IsUUID('4', { message: 'id_person debe ser un UUID v4 válido' })
  @IsNotEmpty({ message: 'El id de persona es obligatorio' })
  id_person!: string;
}

