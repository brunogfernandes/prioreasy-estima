import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';

export const colaboradorGuard: CanActivateFn = () => {
  const role = localStorage.getItem('usu_role');

  const router = inject(Router);

  if(role === 'colaborador'){
    return true;
  }

  return router.parseUrl('/dashboard/painel-stakeholder');

};

export const stakeholderGuard: CanActivateFn = () => {
  const role = localStorage.getItem('usu_role');

  const router = inject(Router);

  if(role === 'stakeholder'){
    return true;
  }

  return router.parseUrl('/dashboard/projetos');

};
