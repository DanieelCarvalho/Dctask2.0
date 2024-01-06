import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarefas } from '../models/Tarefas';

@Injectable({
  providedIn: 'root',
})
export class DadosTarefasService {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:3000';
  public listas = new BehaviorSubject<Tarefas[]>([]);

  listarDados(): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(`${this.url}/tarefas`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  criarTarefas(obj: Tarefas): Observable<Tarefas> {
    return this.http.post(`${this.url}/tarefas`, obj, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  modificarTarefa(obj: Tarefas, id: any): Observable<Tarefas> {
    return this.http.put(`${this.url}/tarefas/${id}`, obj, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  remover(id: number): Observable<number> {
    console.log(id, typeof id);
    return this.http.delete<number>(`${this.url}/tarefas/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  //observable executa requisições em períodos de tempo
  // subscriber: Recebe o retorno da reuisição
}
