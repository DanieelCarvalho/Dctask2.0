import { Component } from '@angular/core';
import { LoginComponent } from '../../componentes/login/login.component';
import { FormCadastroComponent } from '../../componentes/form-cadastro/form-cadastro.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [LoginComponent, FormCadastroComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {}
