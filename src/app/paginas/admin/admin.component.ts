import { Component } from '@angular/core';
import { TabelaComponent } from '../../componentes/tabela/tabela.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  criarTarefa(): any {
    const listaTarefas = JSON.parse(
      localStorage.getItem('listaTarefas') || '[]'
    );
    const id = JSON.parse(localStorage.getItem('userLogado') || '[]');

    listaTarefas.push({
      estaDeletado: false,
      usuarioId: id.id,
      idTarefas: listaTarefas.length + 1,
      tarefa: this.formulario.value.tarefa,
      inicio: `${this.formulario.value.dataInit}T${this.formulario.value.horaInit}`,
      fim: `${this.formulario.value.dataFim}T${this.formulario.value.horaFim}`,
      status: '',
      descricao: this.formulario.value.descricao,
    });
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
  }
}
