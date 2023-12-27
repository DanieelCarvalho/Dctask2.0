import { Routes } from '@angular/router';
import { AdminComponent } from './paginas/admin/admin.component';
import { autenticarGuard } from './seguranca/autenticar.guard';
import { HomeComponent } from './paginas/home/home.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [autenticarGuard] },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
