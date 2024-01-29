import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { map, catchError, Observable, throwError, of } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.isLoggedInGuard$;
};
