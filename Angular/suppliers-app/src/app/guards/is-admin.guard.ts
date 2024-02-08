import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { UsersService } from '../services/users.service';

export const isAdminGuard: CanActivateFn = () => {
  const userService = inject(UsersService);
  return userService.hasAdminPermits$;
};
