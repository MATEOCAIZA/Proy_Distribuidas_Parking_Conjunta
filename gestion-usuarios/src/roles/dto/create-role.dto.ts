import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TrimAndCollapse, SanitizeHtml } from '../../common/transformers/sanitize.transformer';
import { ToUpperCaseTrim } from '../../common/transformers/sanitize.transformer';

export class CreateRoleDto {

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'La descripción no puede tener más de 255 caracteres' })
  @SanitizeHtml()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Matches(/^[A-Z]+(_[A-Z]+)*$/, {
    message:
      'El nombre del rol solo puede contener letras y guiones bajos, sin empezar/terminar en guion bajo (ej: ADMIN, USER_MANAGER)',
  })
  @ToUpperCaseTrim()
  name!: string;
}