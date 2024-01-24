import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { of, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.isLoggedInGuard$.pipe(
    map((res) => {
      if (res) {
        return true;
      } else {
        return router.parseUrl('/login');
      }
    })
  );
};
