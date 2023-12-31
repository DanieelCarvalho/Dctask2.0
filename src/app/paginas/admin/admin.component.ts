import { Component, numberAttribute } from '@angular/core';
import { TabelaComponent } from '../../componentes/tabela/tabela.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { DadosTarefasComponent } from '../../componentes/dados-tarefas/dados-tarefas.component';
import { Tarefas } from '../../models/Tarefas';
import { DadosTarefasService } from '../../servicos/dados-tarefas.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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
  primeiroNome: string = this.nome.split(' ');
  token: any = localStorage.getItem('token');

  dadosLocalStorage: Tarefas[] = [];
  constructor(
    private servicoDados: DadosTarefasService,
    private rota: Router
  ) {}

  sair(): any {
    this.rota.navigateByUrl('/home');
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
  }

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

    this.buttons = true;
    console.log(tarefa, 'oi');
    console.log(id, 'mudou');
    this.idTarefa = id;
  }

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
    const payload = {
      tarefa: this.formulario.value.tarefa,
      inicio: `${this.formulario.value.dataInit}T${this.formulario.value.horaInit}`,
      fim: `${this.formulario.value.dataFim}T${this.formulario.value.horaFim}`,
      descricao: this.formulario.value.descricao,
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
  modificarTarefa(status?: string): any {
    const tarefa = this.servicoDados.listas.value.filter((tarefa) => {
      return tarefa.id === this.idTarefa;
    });

    const payload = {
      tarefa: this.formulario.value.tarefa,
      inicio: `${this.formulario.value.dataInit}T${this.formulario.value.horaInit}`,
      fim: `${this.formulario.value.dataFim}T${this.formulario.value.horaFim}`,

      descricao: this.formulario.value.descricao,
      status: status || 'Pendente',
    };
    console.log(this.formulario.value);
    this.servicoDados
      .modificarTarefa(payload as Tarefas, this.idTarefa)
      .subscribe((r) => {
        console.log(r);
      });
    this.servicoDados.listarDados().subscribe((r) => {
      console.log(r);
      this.servicoDados.listas.next(r);
      console.log(this.servicoDados.listas.value, 'oi');
    });
    this.buttons = !this.buttons;
  }

  cancelar(): any {
    this.formulario.reset();
    this.buttons = !this.buttons;
  }
}
