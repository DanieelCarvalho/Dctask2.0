import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefas } from '../models/Tarefas';

@Injectable({
  providedIn: 'root',
})
export class DadosTarefasService {
  constructor(private http: HttpClient) {}

  private urlDados: string = JSON.parse(
    localStorage.getItem('listaTarefas') || '[]'
  );

  listarDados(): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(this.urlDados);
  }
  //observable executa requisições em períodos de tempo
  // subscriber: Recebe o retorno da reuisição
}
