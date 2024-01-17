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
  idTarefa: number | null = null;
  teste: any;

  alterar2(id: any): void {
    this.alterar.emit(id);
  }
  obterStatus(): any {
    const dataAtual = new Date();
    // const dataFim = new Date(this.dadosLocalStorage);

    // const dataDif = (dataFim - dataAtual) / (1000 * 60 * 60 * 24);
    // if (tarefas.status === 'Realizada') {
    //   return 'Realizada';
    // } else if (dataFim > dataAtual && dataDif < 1) {
    //   return 'Pendente';
    // } else if (dataFim > dataAtual) {
    //   return 'andamento';
    // } else {
    //   return 'Em Atraso';
    // }
  }
  mostrarTarefa(id: any): void {
    this.idTarefa = id;
  }
  mostrarTabela(): any {
    this.obterStatus();

    this.servicoDados.listarDados().subscribe((r) => {
      const tarefas = r.map((t) => {
        return {
          ...t,
          inicio: dayjs(t.inicio).format('DD/MM/YYYY HH:mm'),
          fim: dayjs(t.fim).format('DD/MM/YYYY HH:mm'),
        };
      });

      this.servicoDados.listas.next(tarefas);
    });

    this.listaSubscribe = this.servicoDados.listas.subscribe((r) => {
      const tarefas = r.map((t) => {
        return {
          ...t,
        };
      });

      this.dadosLocalStorage = tarefas;
    });
  }

  ngOnInit(): void {
    this.mostrarTabela();
  }
  ngOnDestroy() {
    this.listaSubscribe?.unsubscribe();
  }
}
