import { Horario } from './horario';

export interface BasicRestaurante {
    nombre: string;
    direccion: string;
    descripcion: string;
    telefono: string;
    imagen: string;
    totalCalif: number;
    contadorCalif: number;
    calificacion: number;
    horario: Horario;
}

export class Restaurante {
    _id: string = '';
    nombre: string = '';
    email: string = '';
    direccion: string = '';
    descripcion: string = '';
    telefono: string = '';
    password: string = '';
    horario: Horario = {
        lunes: [0, 0],
        martes: [0, 0],
        miercoles: [0, 0],
        jueves: [0, 0],
        viernes: [0, 0],
        sabado: [0, 0],
        domingo: [0, 0],
    };
    imagen: string = '';
    totalCalif: number = 0;
    contadorCalif: number = 0;
    status: string = '';

    constructor(init?: Partial<Restaurante>) {
        Object.assign(this, init);
    }

    getRating(): number {
        if (this.contadorCalif === 0) {
            return 0;
        }
        return this.totalCalif / this.contadorCalif;
    }
}
