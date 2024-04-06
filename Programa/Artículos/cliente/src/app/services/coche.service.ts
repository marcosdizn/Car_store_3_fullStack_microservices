import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  url = 'http://localhost:4000/coches/';
  url2 = 'http://localhost:4500/usuarios/';

  constructor(private http: HttpClient) { }

  getCoches(): Observable<any> {
    return this.http.get(this.url);
  }

  getCochesPorId(id: string | null): Observable<any> {
    return this.http.get(this.url + 'buscar-coches/id/' + id);
  }
  
  obtenerCoche(id: string | null): Observable<any> {
    return this.http.get(this.url + id);
  }

  getUsuariosPorId(id: string | null): Observable<any> {
    return this.http.get(this.url2 + 'buscar-usuarios/id/' + id);
  }

  getCochesPorMarca(marca: string | null): Observable<any> {
    return this.http.get(this.url + 'buscar-coches/marca/' + marca);
  }

  eliminarCoche(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarCoche(coche: Coche): Observable<any> {
    return this.http.post(this.url, coche);
  }

  editarCoche(id: string, coche: Coche): Observable<any> {
    return this.http.put(this.url + id, coche);
  }
}
