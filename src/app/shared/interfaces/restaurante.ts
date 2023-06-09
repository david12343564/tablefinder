import { Horario } from './horario';

export interface BasicRestaurante {
    email?: string;
    password?: string;
    nombre: string;
    direccion: string;
    descripcion: string;
    imgUrl: string;
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
        lunes: ['00:00', '00:00'],
        martes: ['00:00', '00:00'],
        miercoles: ['00:00', '00:00'],
        jueves: ['00:00', '00:00'],
        viernes: ['00:00', '00:00'],
        sabado: ['00:00', '00:00'],
        domingo: ['00:00', '00:00'],
    };
    imagen: string = '';
    totalCalif: number = 0;
    contadorCalif: number = 0;
    imgUrl: string = '';
    status: string = '';

    constructor(init?: Partial<Restaurante>) {
        Object.assign(this, init);
    }

    getRating(): number {
        if (this.contadorCalif === 0) {
            return 0;
        }
        return Number((this.totalCalif / this.contadorCalif).toFixed(2));
    }
}
