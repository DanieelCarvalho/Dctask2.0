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
import { DatePipe } from '@angular/common';

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
  focus(event: Event) {
    event.preventDefault();
  }

  sair(): any {
    this.rota.navigateByUrl('/home');
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
  }

  alterar(id: number): any {
    this.idTarefa = id;
    console.log('alterando');
    const tarefa = this.servicoDados.listas.value.filter((tarefa) => {
      return tarefa.id === id;
    });
    const dataQuebrada = tarefa[0].inicio?.split('/')[0];

    const dInit = tarefa[0].inicio?.split(' ')[0];
    const dFim = tarefa[0].fim?.split(' ')[0];

    function desformatarData(dataFormatada: any) {
      const dataQuebrada = dataFormatada.split('/');
      return dataQuebrada[2] + '-' + dataQuebrada[1] + '-' + dataQuebrada[0];
    }

    const dataInit = desformatarData(dInit);
    const dataFim = desformatarData(dFim);
    // function desformatarData(12/10/2022) {
    //   const temHora = dataFormatada.includes('T');
    //   if (temHora) {
    //     const horaQuebrada = dataFormatada.split('T');
    //     const dataQuebrada = horaQuebrada[0].split('/');
    //     return (
    //       dataQuebrada[2] +
    //       '-' +
    //       dataQuebrada[1] +
    //       '-' +
    //       dataQuebrada[0] +
    //       'T' +
    //       horaQuebrada[1]
    //     );
    //   }
    //   const dataQuebrada = dataFormatada.split('/');
    //   return dataQuebrada[2] + '-' + dataQuebrada[1] + '-' + dataQuebrada[0];
    // }
    const valorCerto = desformatarData('30/12/2023');

    this.formulario.patchValue({
      tarefa: tarefa[0].tarefa || '',
      dataInit: dataInit,
      horaInit: tarefa[0].inicio?.split(' ')[1] || '',
      dataFim: dataFim,
      horaFim: tarefa[0].fim?.split(' ')[1] || '',
      descricao: tarefa[0].descricao || '',
    });
    this.buttons = true;
  }

  apagarTarefa(): any {
    if (this.idTarefa) {
      this.servicoDados.remover(this.idTarefa).subscribe({
        next: () => {
          this.idTarefa = null;
          this.formulario.reset();
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
        },
      });
      //   this.servicoDados.remover(this.idTarefa).subscribe((r) => {
      //     this.idTarefa = null;
      //     this.formulario.reset();
      //   });
    }
    this.buttons = !this.buttons;
  }

  criarTarefa(): any {
    const payload = {
      tarefa: this.formulario.value.tarefa,
      inicio: `${this.formulario.value.dataInit}T${this.formulario.value.horaInit}:00`,
      fim: `${this.formulario.value.dataFim}T${this.formulario.value.horaFim}:00`,
      descricao: this.formulario.value.descricao,
    };

    this.servicoDados.criarTarefas(payload as Tarefas).subscribe((r) => {
      console.log(r);
    });

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

    this.formulario.reset();
  }
  onfocus(evento: Event) {
    console.log(evento);
  }
  modificarTarefa(status?: string): any {
    const tarefa = this.servicoDados.listas.value.filter((tarefa) => {
      return tarefa.id === this.idTarefa;
    });
    console.log(tarefa, 'vasco');

    const payload = {
      tarefa: this.formulario.value.tarefa,
      inicio: `${this.formulario.value.dataInit}T${this.formulario.value.horaInit}`,
      fim: `${this.formulario.value.dataFim}T${this.formulario.value.horaFim}`,

      descricao: this.formulario.value.descricao,
      status: status || 'Pendente',
    };

    this.servicoDados
      .modificarTarefa(payload as Tarefas, this.idTarefa)
      .subscribe({
        next: () => {
          this.servicoDados.listarDados().subscribe((r) => {
            const tarefas = r.map((t) => {
              return {
                ...t,

                inicio: dayjs(t.inicio).format('DD/MM/YYYY HH:mm'),
                fim: dayjs(t.fim).format('DD/MM/YYYY HH:mm'),
              };
            });

            console.log(this.formulario.value, 'vasco');
            this.servicoDados.listas.next(tarefas);
            console.log(this.servicoDados.listas.value, 'oi');
          });
          this.formulario.reset();
        },
      });
    this.buttons = !this.buttons;
  }

  cancelar(): any {
    console.log('cancelar');
    this.formulario.reset();
    this.buttons = !this.buttons;
  }
}
