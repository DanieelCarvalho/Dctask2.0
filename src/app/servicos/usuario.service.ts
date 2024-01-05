import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';
import { Credencial } from '../models/Credencial';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = 'http://localhost:3000';
  // private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // selecionar(): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(`${this.url}/Usuario`,{headers: authorization: ´Bearer ${token}´});

  // }

  //   get('PATH', CONFIG)
  // post('PATH', BODY, CONFIG)
  cadastrar(obj: Usuario): Observable<Usuario> {
    return this.http.post(`${this.url}/cadastro`, obj);
  }

  autenticar(credential: Credencial): Observable<any> {
    return this.http.post(`${this.url}/login`, credential);
  }
}
