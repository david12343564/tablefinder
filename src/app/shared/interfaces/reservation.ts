export interface Reservation {
    nombreComensal?:string,
    nombreMesa?:string,
    calificacionResena?:Number,
    nombreRestaurante?:string,
    fecha: Date,
    dia: string,
    _id: string,
    hora: string,
    idMesa: string,
    codigo: string,
    orden: any,
    idRestaurante: string,
    idCliente: string,
    idReservacion?: string,
    peticiones: string
}

export interface ReservationInit {
    dia: string,
    hora: string,
    peticiones?:string,
    idMesa: string,
    idRestaurante: string,
    idCliente: string
}
