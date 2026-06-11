import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';

export class Buseta extends Vehiculo{
    @Column()
    tamanio! : string;

    @Column()
    capacidad! : number;

    obtenerTipo(): string {
        return "Buseta";
    }
}