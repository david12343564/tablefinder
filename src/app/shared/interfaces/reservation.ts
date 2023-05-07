export interface Reservation {
    fecha: Date,
    dia: string,
    hora: string,
    mesa: string,
    codigo: String,
    orden: [{
        producto: string,
        cantidad: Number
    }],
    idRestaurante: string,
    idCliente: string,
    peticiones: string
}
