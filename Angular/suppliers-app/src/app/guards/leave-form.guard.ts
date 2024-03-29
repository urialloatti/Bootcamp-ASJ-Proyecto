import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ModalService } from '../services/modal.service';

export const leaveFormGuard: CanActivateFn = (route, state) => {
  const modalService = inject(ModalService);
  if (modalService.hasFormChanged()) {
    modalService.sendConfirmLeaveNext(true);
    return modalService.confirmLeave$;
  }
  return true;
};
