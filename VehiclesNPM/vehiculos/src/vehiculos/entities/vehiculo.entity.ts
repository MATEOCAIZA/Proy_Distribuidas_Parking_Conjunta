import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

export enum Clasificacion{
    ELECTRICO = 'Electrico',
    HIBRIDO = 'Hibrido',
    GASOLINA = 'Gasolina',
    DIESEL = 'Diesel'
}

@Entity()
@TableInheritance({column : {type : 'varchar', name : 'tipo'}})
//Herencia de tablas. Usa como campo diferenciador un campo tipo
export abstract class Vehiculo {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({unique: true})
    placa!: string;

    @Column()
    marca!: string;

    @Column()
    modelo!: string;

    @Column()
    color!: string;

    @Column()
    anio!: number; //Puede existir hasta un año más al actual
    
    @Column({type : 'enum', enum : Clasificacion})
    clasificacion!: Clasificacion


    abstract obtenerTipo(): string;
}
