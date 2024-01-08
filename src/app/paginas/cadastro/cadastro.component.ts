import { Component } from '@angular/core';
import { LoginComponent } from '../../componentes/login/login.component';
import { FormCadastroComponent } from '../../componentes/form-cadastro/form-cadastro.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [LoginComponent, FormCadastroComponent, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  constructor(private rota: Router) {}

  retornar(): any {
    this.rota.navigateByUrl('/home');
  }
}
