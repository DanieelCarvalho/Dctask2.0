import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicos/usuario.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cadastro.component.html',
  styleUrl: './form-cadastro.component.css',
})
export class FormCadastroComponent {
  constructor(private servico: UsuarioService, private rota: Router) {}

  usuarios: Usuario[] = [];

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  cadastrar(): void {
    this.servico
      .cadastrar(this.formulario.value as Usuario)
      .subscribe((usuario) => {
        this.usuarios.push(usuario);
        this.formulario.reset();
      });
    this.rota.navigateByUrl('/home');
    // const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    // const emailExiste: boolean = listaUser.some(
    //   (user: { email: string }) => user.email === this.formulario.value.email
    // );

    // if (!emailExiste) {
    //   listaUser.push({
    //     id: listaUser.length + 1,
    //     nome: this.formulario.value.nome,
    //     email: this.formulario.value.email,
    //     senha: this.formulario.value.senha,
    //   });
  }
  // localStorage.setItem('listaUser', JSON.stringify(listaUser));
}
