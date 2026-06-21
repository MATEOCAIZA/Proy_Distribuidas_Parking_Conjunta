import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, Max, MaxDate, MaxLength, Min, MinLength, IsIn, ValidateNested, Validate, IsEmpty, IsEnum, IsOptional, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { TipoMoto } from "../entities/motocicleta.entity";
import { Clasificacion } from "../entities/vehiculo.entity";
import { MaxYearConstraint } from "../utils/validators";

export class BaseVehiculoDto{
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty({message : "No debe dejar la placa vacía"})//No valores vacíos
    @Matches(/^[A-Z]{3}-\d{4}$/, {message: 'La placa debe tern un formato válido. Ej: ABC-1234'})
    placa!: string;

    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(2, {message : "La marca debe tener al menos 2 caracteres"})//Existe una marca ds
    @MaxLength(30, {message : "La marca no puede tener más de 30 caracteres"})
    @Matches(/^[A-zA-Z\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]+$/, {message : "La marca solo puede contener letras y espacios"})
    marca!: string;
    
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "El modelo debe tener al menos 3 caracteres"})
    @MaxLength(107, {message : "El modelo no puede tener más de 107 caracteres"})
    @Matches(/^[A-zA-Z0-9\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]+$/, {message : "La marca solo puede contener letras, números y espacios"})
    modelo!: string;

    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "El color debe tener al menos 3 caracteres"})
    @MaxLength(64, {message : "El color no puede tener más de 64 caracteres"})
    @Matches(/^[A-zA-Z\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]+$/, {message : "El color solo puede contener letras y espacios"})
    color!: string;

    @IsNumber()
    @IsInt({message : "El año debe ser un entero"})
    @IsNotEmpty()
    @Validate(MaxYearConstraint)
    @Min(1885, {message : "El año no debe ser menor a 1885"})
    anio! : number

    //Validacion de clasificacion
    @IsNotEmpty()
    @IsEnum(Clasificacion)
    clasificacion! : Clasificacion;
}

export class AutoDto extends BaseVehiculoDto{
    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Min(2)
    @Max(5)
    numeroPuertas! : number;

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Min(150)
    @Max(800)
    capacidadMaletero! : number;

    //-----Validacion Campos externos -----
    
    // @IsEmpty({message : "Este no es un atributo del auto"})
    // capacidadCarga! : number;
    

}

export class MotocicletaDto extends BaseVehiculoDto{
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @Matches(/^[A-Z]{3}\d{3}[A-Z]$/, {message: 'La placa debe tern un formato válido. Ej: ABC123D'})
    declare placa: string;

    @IsNotEmpty()
    @IsEnum(TipoMoto, {message : "La moto debe ser de tipo: 'Deportiva', 'Scooter' o 'Motocross'"})
    tipoMoto! : TipoMoto;
}

export class CamionetaDto extends BaseVehiculoDto{
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
  @IsIn(['Auto', 'Motocicleta', 'Camioneta'])
  tipo!: string;

  // Referencia al dueño en gestion-usuarios (Persona). Opcional: admite
  // vehículos de visitantes walk-in sin dueño registrado. Se valida su
  // existencia vía HTTP en VehiculosService.create(), no es una FK real.
  @IsOptional()
  @IsUUID()
  idPropietario?: string;

  @ValidateNested()
  @Type((opts) => {
    const object = opts?.object as CreateVehiculoDto;
    if (!object) return BaseVehiculoDto;

    switch (object.tipo.toLowerCase()) {
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
