import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, Max, MaxDate, MaxLength, Min, MinLength, IsIn, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class BaseVehiculoDto{
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @Matches(/^[A-Z]{3}-\d{4}$/, {message: 'La placa debe tern un formato válido. Ej: ABC-1234'})
    placa!: string;

    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "La marca debe tener al menos 3 caracteres"})
    @MaxLength(30, {message : "La marca no puede tener más de 30 caracteres"})
    @Matches(/^[A-zA-Z\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ$]+$/, {message : "La marca solo puede contener letras y espacios"})
    marca!: string;
    
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "El modelo debe tener al menos 3 caracteres"})
    @MaxLength(107, {message : "El modelo no puede tener más de 107 caracteres"})
    @Matches(/^[A-zA-Z0-9\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ$]+$/, {message : "La marca solo puede contener letras, números y espacios"})
    modelo!: string;

    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "El modelo debe tener al menos 3 caracteres"})
    @MaxLength(64, {message : "El modelo no puede tener más de 64 caracteres"})
    @Matches(/^[A-zA-Z\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ$]+$/, {message : "La marca solo puede contener letras y espacios"})
    color!: string;

    @IsNumber()
    @IsInt({message : "El año debe ser un entero"})
    @IsNotEmpty()
    //@Max() Como colocar que el año maximo sea el proximo del actual
    @Min(1885, {message : "El año no debe ser menor a 1885"})
    anio! : number
}

class AutoDto extends BaseVehiculoDto{
    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Min(2)
    @Max(5)
    numeroPuertas! : number;

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Min(300)
    @Max(800)
    capacidadMaletero! : number;
}

class MotocicletaDto extends BaseVehiculoDto{
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @Matches(/^[A-Z]{3}\d{3}[A-Z]$/, {message: 'La placa debe tern un formato válido. Ej: ABC-123D'})
    declare placa: string;
}

class CamionetaDto extends BaseVehiculoDto{
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\bsimple\b|\bdoble\b)$/, {message : "La camioneta solo puede ser 'simple' o 'doble'"})
    cabina! : string;
    
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(450)
    @Max(1360)
    capacidadCarga! : number;


}


export class CreateVehiculoDto {
  @IsIn(['Auto', 'Moto', 'Camioneta'])
  tipo!: string;

  @ValidateNested()
  @Type((opts) => {
    const object = opts?.object as CreateVehiculoDto;
    if (!object) return BaseVehiculoDto;

    switch (object.tipo) {
      case 'auto':
        return AutoDto;
      case 'motocicleta':
        return MotocicletaDto;
      case 'camioneta':
        return CamionetaDto;
      default:
        return BaseVehiculoDto;
    }
  })
  datos!: AutoDto | MotocicletaDto | CamionetaDto;
}
