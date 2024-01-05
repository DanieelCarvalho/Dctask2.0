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
import { UsuarioService } from '../../servicos/usuario.service';
import { Credencial } from '../../models/Credencial';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CadastroComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',

  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private rota: Router, private servico: UsuarioService) {}

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  autenticar(): void {
    this.servico
      .autenticar(this.formulario.value as Credencial)
      .subscribe((r) => {
        this.rota.navigateByUrl('/admin');
        localStorage.setItem('token', r.token);
        localStorage.setItem('nome', r.username);
        console.log(r);
      });
  }
}
