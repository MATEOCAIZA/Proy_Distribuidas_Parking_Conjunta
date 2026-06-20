import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEcuadorianDni } from '../../common/validators/is-ecuadorian-dni.validator';
import { TrimAndCollapse, NormalizeEmail, TrimOnly, SanitizeHtml } from '../../common/transformers/sanitize.transformer';

export class CreatePersonaDto {

  @IsOptional()
  @IsString()
  @TrimOnly()
  @SanitizeHtml()
  address?: string;

@IsString()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MaxLength(10, { message: 'La cédula ecuatoriana debe tener 10 dígitos' })
  @MinLength(10, { message: 'La cédula ecuatoriana debe tener 10 dígitos' })
  @IsEcuadorianDni()
  @TrimOnly()
  dni!: string;

  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @MaxLength(50, { message: 'El email no puede tener más de 50 caracteres' })
  @NormalizeEmail()
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'El primer nombre es obligatorio' })
  @MinLength(2, { message: 'El primer nombre debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El primer nombre no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El primer nombre solo puede contener letras y espacios',
  })
  @TrimAndCollapse()
  @Matches(/\S/, { message: 'El nombre no puede estar vacío o ser solo espacios' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El apellido no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  @TrimAndCollapse()
  @Matches(/\S/, { message: 'El apellido no puede estar vacío o ser solo espacios' })
  lastName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'El segundo nombre no puede tener más de 30 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El segundo nombre solo puede contener letras y espacios',
  })
  @Matches(/\S/, { message: 'El segundo nombre no puede estar vacío o ser solo espacios' })
  @TrimAndCollapse()
  middleName?: string;

  @IsString()
  @IsNotEmpty({ message: 'La nacionalidad es obligatoria' })
  @MaxLength(30, { message: 'La nacionalidad no puede tener más de 30 caracteres' })
  @MinLength(3, { message: 'La nacionalidad no puede tener menos de 3 caracteres' })
  @Matches(/^[A-Za-záéíóúÁÉÍÓÚäëïöü\s]+$/, { message: 'La nacionalidad solo puede contener espacios y letras' })
  @TrimAndCollapse()
  nationality!: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(17, { message: 'El teléfono no puede tener más de 17 dígitos' })
  @MinLength(5, { message: 'El número de teléfono no puede tener menos de 5 dígitos' })
  @Matches(/^\+?[0-9]+$/, { message: 'El teléfono solo puede contener números, espacios, + y -' })
  @TrimOnly()
  phone!: string;
}