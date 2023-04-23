import { Horario } from './horario';

export interface Restaurante {
    nombre: string;
    email: string;
    direccion: string;
    telefono: string;
    horario: Horario;
    status: string;
}
