import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRoleDto {
  // @IsOptional()
  // @IsBoolean()
  // active?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Matches(/^[A-Za-z_]+$/, {
    message:
      'El nombre del rol solo puede contener letras y guiones bajos (ej: ADMIN, USER_MANAGER)',
  })
  name!: string;
}

