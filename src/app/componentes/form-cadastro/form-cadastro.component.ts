import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cadastro.component.html',
  styleUrl: './form-cadastro.component.css',
})
export class FormCadastroComponent {
  constructor(private rota: Router) {}
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  cadastrar(): void {
    const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    const emailExiste: boolean = listaUser.some(
      (user: { email: string }) => user.email === this.formulario.value.email
    );

    if (!emailExiste) {
      listaUser.push({
        id: listaUser.length + 1,
        nome: this.formulario.value.nome,
        email: this.formulario.value.email,
        senha: this.formulario.value.senha,
      });
    }
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    console.log('dentro');
    this.rota.navigateByUrl('/home');
  }
}
