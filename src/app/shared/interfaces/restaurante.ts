import { Horario } from './horario';

export interface Restaurante {
    _id: string;
    nombre: string;
    email: string;
    direccion: string;
    telefono: string;
    horario: Horario;
    imagen: string;
    rating: number;
    status: string;
}
