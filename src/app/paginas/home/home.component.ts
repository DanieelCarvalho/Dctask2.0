import { Component } from '@angular/core';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CadastroComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',

  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private rota: Router) {}
  userValid = {
    id: '',
    nome: '',
    email: '',
    senha: '',
  };

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  autenticar(): void {
    const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.forEach((item: any) => {
      if (
        this.formulario.value.email == item.email &&
        this.formulario.value.senha === item.senha
      ) {
        this.userValid = {
          id: item.id,
          nome: item.nome,
          email: item.email,
          senha: item.senha,
        };
      }
      if (
        this.formulario.value.email === this.userValid.email &&
        this.formulario.value.senha === this.userValid.senha
      ) {
        this.rota.navigateByUrl('/admin');
        const token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);

        localStorage.setItem('userLogado', JSON.stringify(this.userValid));
      }
      console.log(this.userValid);
    });
  }

  //   if (
  //     this.formulario.value.email === 'danielscg2012@gmail.com' &&
  //     this.formulario.value.senha === '123'
  //   ) {
  //     localStorage.setItem('email', this.formulario.value.email);

  //     // Redirecionamento de rota
  //     this.rota.navigateByUrl('/admin');
  //   } else {
  //     alert('E-mail ou senha incorretos.');
  //   }
  // }
}
