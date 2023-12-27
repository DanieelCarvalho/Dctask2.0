import { CanActivateFn, Router } from '@angular/router';

export const autenticarGuard: CanActivateFn = (route, state) => {
  const rota = new Router();

  if (localStorage.getItem('email') === undefined) {
    rota.navigateByUrl('/home');
  }

  return true;
};
