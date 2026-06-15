import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePersonaDto {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'El DNI no puede tener más de 30 caracteres' })
  @Matches(/^[0-9A-Za-z-]+$/, { message: 'El DNI solo puede contener letras, números y guiones' })
  dni?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @MaxLength(50, { message: 'El email no puede tener más de 50 caracteres' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El primer nombre debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El primer nombre no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El primer nombre solo puede contener letras y espacios',
  })
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El apellido no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  last_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'El segundo nombre no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El segundo nombre solo puede contener letras y espacios',
  })
  middle_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'La nacionalidad no puede tener más de 30 caracteres' })
  nationality?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15, { message: 'El teléfono no puede tener más de 15 caracteres' })
  @Matches(/^\+?[0-9\s-]+$/, {
    message: 'El teléfono solo puede contener números, espacios, + y -',
  })
  phone?: string;
}

