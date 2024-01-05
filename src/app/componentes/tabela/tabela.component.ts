import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DadosTarefasService } from '../../servicos/dados-tarefas.service';
import { Tarefas } from '../../models/Tarefas';
import { BehaviorSubject, Subscription } from 'rxjs';
import dayjs from 'dayjs';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent {
  constructor(private servicoDados: DadosTarefasService) {}

  // dados: Tarefas[] = [];
  dadosLocalStorage: Tarefas[] = [];

  @Output() alterar = new EventEmitter<number>();

  listaSubscribe: any = Subscription;

  alterar2(id: any): void {
    this.alterar.emit(id);
    console.log(id, 'ola');
    // console.log(this.dadosLocalStorage);
  }

  ngOnInit(): void {
    this.servicoDados.listarDados().subscribe((r) => {
      this.servicoDados.listas.next(r);
    });

    this.listaSubscribe = this.servicoDados.listas.subscribe((r) => {
      this.dadosLocalStorage = r;
    });
  }
  ngOnDestroy() {
    this.listaSubscribe?.unsubscribe();
  }
}
