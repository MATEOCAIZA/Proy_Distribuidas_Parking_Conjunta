import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, Max, MaxDate, MaxLength, Min, MinLength, IsIn, ValidateNested, Validate, IsEmpty, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { TipoMoto } from "../entities/motocicleta.entity";
import { Clasificacion } from "../entities/vehiculo.entity";
import { MaxYearConstraint } from "../utils/validators";
import { ApiProperty, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";


export class BaseVehiculoDto{
    @ApiProperty({
      description: "Placa del vehículo",
      example: "ABC-1234"})
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty({message : "No debe dejar la placa vacía"})//No valores vacíos
    @Matches(/^[A-Z]{3}-\d{4}$/, {message: 'La placa debe tener un formato válido. Ej: ABC-1234'})
    placa!: string;

    @ApiProperty({description: "Marca del vehículo",
      example: "Toyota",
      minLength: 2,
      maxLength: 30
    })
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(2, {message : "La marca debe tener al menos 2 caracteres"})//Existe una marca ds
    @MaxLength(30, {message : "La marca no puede tener más de 30 caracteres"})
    @Matches(/^[A-zA-Z\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]+$/, {message : "La marca solo puede contener letras y espacios"})
    marca!: string;
    
    @ApiProperty({description: "Modelo del vehículo",
      example: "Corolla",
      minLength: 3,
      maxLength: 107
    })
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "El modelo debe tener al menos 3 caracteres"})
    @MaxLength(107, {message : "El modelo no puede tener más de 107 caracteres"})
    @Matches(/^[A-zA-Z0-9\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]+$/, {message : "El modelo solo puede contener letras, números y espacios"})
    modelo!: string;

    @ApiProperty({description: "Color del vehículo",example: "Rojo",
      minLength: 3,
      maxLength: 64
    })
    @IsString()//Valida para evitar ataques SQL
    @IsNotEmpty()//No valores vacíos
    @MinLength(3, {message : "El color debe tener al menos 3 caracteres"})
    @MaxLength(64, {message : "El color no puede tener más de 64 caracteres"})
    @Matches(/^[A-zA-Z\s\-áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]+$/, {message : "El color solo puede contener letras y espacios"})
    color!: string;

    @ApiProperty({description: "Año del vehículo",example: 2020,
      minimum: 1885,
      maximum: new Date().getFullYear(),
      type: 'integer'
    })
    @IsNumber()
    @IsInt({message : "El año debe ser un entero"})
    @IsNotEmpty()
    @Validate(MaxYearConstraint)
    @Min(1885, {message : "El año no debe ser menor a 1885"})
    anio! : number

    //Validacion de clasificacion
    @ApiProperty({description: "Combustible del vehículo",example: "Eléctrico", enum: ['Eléctrico', 'Gasolina', 'Diésel']})
    @IsNotEmpty()
    @IsEnum(Clasificacion)
    clasificacion! : Clasificacion;
}


export class AutoDto extends BaseVehiculoDto{
    @ApiProperty({description: "Número de puertas del auto",example: 4,
      minimum: 2,
      maximum: 5,
      type: 'integer'
    })
    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    @Min(2)
    @Max(5)
    numeroPuertas! : number;

    @ApiProperty({description: "Capacidad del maletero en kg",example: 450,
      minimum: 150,
      maximum: 800,
      type: 'integer'
    })
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
    @ApiProperty({description: "Placa de la motocicleta",example: "ABC123D"})
    declare placa: string;

    @ApiProperty({description: "Tipo de motocicleta",example: "Deportiva", enum: ['Deportiva', 'Scooter', 'Motocross']})
    @IsNotEmpty()
    @IsEnum(TipoMoto, {message : "La moto debe ser de tipo: 'Deportiva', 'Scooter' o 'Motocross'"})
    tipoMoto! : TipoMoto;
}

export class CamionetaDto extends BaseVehiculoDto{
    @ApiProperty({description: "Tipo de cabina",example: "simple", enum: ['simple', 'doble']})
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\bsimple\b|\bdoble\b)$/, {message : "La camioneta solo puede ser 'simple' o 'doble'"})
    cabina! : string;
    
    @ApiProperty({description: "Capacidad de carga en kg",example: 800,
      minimum: 450,
      maximum: 1360,
      type: 'integer'
    })
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(450)
    @Max(1360)
    capacidadCarga! : number;
}

@ApiExtraModels(AutoDto, MotocicletaDto, CamionetaDto)
export class CreateVehiculoDto {
  @ApiProperty({description: "Tipo de vehículo",example: "Auto", enum: ['Auto', 'Motocicleta', 'Camioneta']})
  @IsIn(['Auto', 'Motocicleta', 'Camioneta'])
  tipo!: string;

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
  @ApiProperty({description: "Datos específicos del vehículo", 
    oneOf: [
      { $ref: getSchemaPath(AutoDto) },
      { $ref: getSchemaPath(MotocicletaDto) },
      { $ref: getSchemaPath(CamionetaDto) }
    ]

  })
  datos!: AutoDto | MotocicletaDto | CamionetaDto;
}
