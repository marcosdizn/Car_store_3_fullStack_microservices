export class Coche {
    _id?: number;
    marca: string;
    modelo: string;
    potencia: number;
    combustible: string;
    traccion: string;
    cantidad: number;
    precio: number;

    constructor(marca: string, modelo: string, potencia: number, combustible: string, traccion: string, cantidad: number, precio: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.potencia = potencia;
        this.combustible = combustible;
        this.traccion = traccion;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}