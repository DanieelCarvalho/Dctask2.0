import { Component } from '@angular/core';
import { TabelaComponent } from '../../componentes/tabela/tabela.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { DadosTarefasComponent } from '../../componentes/dados-tarefas/dados-tarefas.component';
import { Tarefas } from '../../models/Tarefas';
import { DadosTarefasService } from '../../servicos/dados-tarefas.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TabelaComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  formulario = new FormGroup({
    tarefa: new FormControl(''),
    dataInit: new FormControl(''),
    dataFim: new FormControl(''),
    horaInit: new FormControl(''),
    horaFim: new FormControl(''),
    descricao: new FormControl(''),
  });

  nome: any = localStorage.getItem('nome');
  idTarefa: number | null = null;
  buttons: boolean = false;

  dadosLocalStorage: Tarefas[] = [];
  constructor(private servicoDados: DadosTarefasService) {}

  alterar(id: number): any {
    const tarefa = this.servicoDados.listas.value.filter((tarefa) => {
      return tarefa.id === id;
    });

    this.formulario.value.tarefa = tarefa[0].tarefa;
    this.formulario.value.dataInit = tarefa[0].inicio?.split('T')[0];
    this.formulario.value.horaInit = tarefa[0].inicio?.split('T')[1];
    this.formulario.value.dataFim = tarefa[0].fim?.split('T')[0];
    this.formulario.value.horaFim = tarefa[0].fim?.split('T')[1];
    this.formulario.value.descricao = tarefa[0].descricao;

    console.log(tarefa, 'oi');
    console.log(id, 'mudou');
    this.idTarefa = id;
    this.buttons = !this.buttons;
  }

  token: any = localStorage.getItem('token');

  apagarTarefa(): any {
    if (this.idTarefa) {
      this.servicoDados.remover(this.idTarefa).subscribe((r) => {
        this.idTarefa = null;
        this.formulario.reset();
      });
      this.servicoDados.listarDados().subscribe((r) => {
        console.log(r);
        this.servicoDados.listas.next(r);
      });
    }
  }

  criarTarefa(): any {
    console.log(this.formulario.value);
    const payload = {
      tarefa: this.formulario.value.tarefa,
      inicio: `${this.formulario.value.dataInit}T${this.formulario.value.horaInit}`,
      fim: `${this.formulario.value.dataFim}T${this.formulario.value.horaFim}`,
      descricao: this.formulario.value.descricao,
      status: 'pendente',
    };

    this.servicoDados.criarTarefas(payload as Tarefas).subscribe((r) => {
      console.log(r);
    });

    this.servicoDados.listarDados().subscribe((r) => {
      console.log(r);
      this.servicoDados.listas.next(r);
      console.log(this.servicoDados.listas.value, 'oi');
    });
    this.formulario.reset();
  }
}
