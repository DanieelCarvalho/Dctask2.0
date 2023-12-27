import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DadosTarefasService } from '../../servicos/dados-tarefas.service';
import { Tarefas } from '../../models/Tarefas';
import dayjs from 'dayjs';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
})
export class TabelaComponent {
  // constructor(private servicoDados: DadosTarefasService) {}

  // dados: Tarefas[] = [];

  dadosLocalStorage: any[] = [];

  ngOnInit(): void {
    // Acesse os dados do localStorage aqui
    const dadosArmazenados = JSON.parse(
      localStorage.getItem('listaTarefas') || '[]'
    );
    const userLogado = JSON.parse(localStorage.getItem('userLogado') || '{}');

    if (dadosArmazenados && userLogado) {
      const tarefasUsuario = dadosArmazenados.filter((tarefa: any) => {
        return tarefa.usuarioId === userLogado.id;
      });

      tarefasUsuario.forEach((tarefa: any) => {
        tarefa.inicioFormatado = dayjs(tarefa.inicio).format(
          'DD/MM/YYYY HH:mm'
        );
        tarefa.fimFormatado = dayjs(tarefa.fim).format('DD/MM/YYYY HH:mm');
      });

      tarefasUsuario.forEach((tarefa: any) => {
        const dataAtual: any = new Date();
        const dataFim: any = new Date(tarefa.fim);
        const dataDif = (dataFim - dataAtual) / (1000 * 60 * 60 * 24);
        if (tarefa.status === 'Realizada') {
          return (tarefa.status = 'Realizada');
        } else if (dataFim > dataAtual && dataDif < 1) {
          return (tarefa.status = 'Pendente');
        } else if (dataFim > dataAtual) {
          return (tarefa.status = 'andamento');
        } else {
          return (tarefa.status = 'Em Atraso');
        }
      });

      this.dadosLocalStorage = tarefasUsuario;
    }
  }

  // exibirTabela(): any {
  //   this.servicoDados.listarDados().subscribe((retorno) => {
  //     console.table(retorno);
  //   });
  // let listaTarefas = JSON.parse(localStorage.getItem('listaTarefas') || '[]');
  // let userLogado = JSON.parse(localStorage.getItem('userLogado') || '[]');

  // if (userLogado && listaTarefas) {
  //   this.tarefasUsuario = listaTarefas.filter(
  //     (tarefa: { idTarefas: number }) => tarefa.idTarefas === userLogado.id
  //   );
  // }
}

// ngOnInit() {
//   this.exibirTabela();
//   console.log(this.tarefasUsuario);
// }
