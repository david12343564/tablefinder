export interface Reservation {
    nombreComensal?:String,
    nombreMesa?:String,
    calificacionResena?:Number,
    fecha: Date,
    dia: string,
    _id: string,
    hora: string,
    idMesa: string,
    codigo: String,
    orden: [{
        producto: string,
        cantidad: Number
    }],
    idRestaurante: string,
    idCliente: string,
    peticiones: string
}
