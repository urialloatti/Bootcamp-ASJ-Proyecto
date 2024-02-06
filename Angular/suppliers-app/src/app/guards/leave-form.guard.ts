import { CanActivateFn } from '@angular/router';

export const leaveFormGuard: CanActivateFn = (route, state) => {
  return confirm('¿Está seguro que desea abandonar esta página?');
};
