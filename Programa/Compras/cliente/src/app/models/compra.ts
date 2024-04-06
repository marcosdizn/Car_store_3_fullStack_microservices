import { Coche } from "./coche";
import { Usuario } from "./usuario";

export class Compra {
    _id?: number;
    cantidad: number;
    NombreCliente: string;
    direccion: string;
    coche: Coche;
    usuario: Usuario;
    id_coche: string;
    id_usuario: string;
   

    constructor(cantidad: number, NombreCliente: string, direccion: string, coche: Coche, usuario: Usuario,id_coche: string,id_usuario: string) {
        this.cantidad = cantidad;
        this.NombreCliente = NombreCliente;
        this.direccion = direccion;
        this.coche=coche;
        this.usuario=usuario;
        this.id_coche=id_coche;
        this.id_usuario=id_usuario
    }
}