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
    orden: [{
        producto: string,
        cantidad: Number
    }],
    idRestaurante: string,
    idCliente: string,
    idReservacion?: string,
    peticiones: string
}
