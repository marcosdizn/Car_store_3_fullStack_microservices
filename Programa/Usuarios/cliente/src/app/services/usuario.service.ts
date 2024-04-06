import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:4500/usuarios/'; //Mismo url que en postman (dir BD y coleccion)
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);//El metodo devuelve un observable
  }

  getUsuariosPorId(id: string | null): Observable<any> {
    return this.http.get(this.url + 'buscar-usuarios/id/' + id);
  }

  getUsuariosPorRol(rol: string | null): Observable<any> {
    return this.http.get(this.url + 'buscar-usuarios/rol/' + rol);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(this.url + id);//Le pasamos el ID del producto por parametro
  }

  guardarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  obtenerUsuario(id: string | null): Observable<any> { //Para pasarle el ID al componente de editar
    return this.http.get(this.url + id);//Le pasamos el ID del producto por parametro
  }

  editarUsuario(id: string, usuario: Usuario): Observable<any> {
    return this.http.put(this.url + id, usuario);//Put para actualizar valores atributos
  }
}
