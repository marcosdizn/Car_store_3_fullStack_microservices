import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  url = 'http://localhost:4000/coches/';
  url2 = 'http://localhost:4500/usuarios/';
  url3 = 'http://localhost:5000/compras/';

  constructor(private http: HttpClient) { }

  //USUARIOS
  getUsuariosPorId(id: string | null): Observable<any> {
    return this.http.get(this.url2 + 'buscar-usuarios/id/' + id);
  }

  //COCHES
  getCoches(): Observable<any> {
    return this.http.get(this.url);
  }

  getCochesPorId(id: string | null): Observable<any> {
    return this.http.get(this.url + 'buscar-coches/id/' + id);
  }
  
  getCochesPorMarca(marca: string | null): Observable<any> {
    return this.http.get(this.url + 'buscar-coches/marca/' + marca);
  }

  guardarCoche(coche: Coche): Observable<any> {
    return this.http.post(this.url, coche);
  }

  eliminarCoche(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  editarCoche(id: string, coche: Coche): Observable<any> {
    return this.http.put(this.url + id, coche);
  }

  //COMPRAS
  getCompras(): Observable<any> {
    return this.http.get(this.url3);
  }

  obtenerCompra(id: string | null): Observable<any> {
    return this.http.get(this.url3 + id);
  }

  getComprasPorId(id: string | null): Observable<any> { //ID DE LA COMPRA
    return this.http.get(this.url3 + 'buscar-compras/id/' + id);
  }

  getComprasPorNombreCliente(NombreCliente: string | null): Observable<any> {
    return this.http.get(this.url3 + 'buscar-compras/NombreCliente/' + NombreCliente);
  }

  getComprasPorID_Usuario(id_usuario: string | null): Observable<any> {//ID DEL USUARIO
    return this.http.get(this.url3 + 'buscar-compras/id_usuario/' + id_usuario);
  }

  guardarCompra(compra: Compra): Observable<any> {
    return this.http.post(this.url3, compra);
  }

  eliminarCompra(id: string): Observable<any> {
    return this.http.delete(this.url3 + id);
  }

  editarCompra(id: string, compra: Compra): Observable<any> {
    return this.http.put(this.url3 + id, compra);
  }
}
