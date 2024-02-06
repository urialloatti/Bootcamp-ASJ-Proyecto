import { Component } from '@angular/core';

import { UsersService } from '../../../services/users.service';

import { ModalMessageInterface } from '../../../interfaces/modalInterface';
import { UserRequestDTO } from '../../../interfaces/userInterface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent {
  constructor(private userService: UsersService) {}

  public currentUser: UserRequestDTO = {
    name: '',
    surname: '',
    email: '',
    passwordHash: '',
    username: '',
  };
  public repitedPass: string = '';
  public isUserInvalid: any = {
    name: false,
    surname: false,
    email: false,
    passwordHash: false,
    username: false,
  };
  arePasswordsNotEqual: boolean = false;
  userAlreadyExists: boolean = false;
  isFormValid: boolean = true;

  flagNewUserCreated: boolean = false;
  modalMessageFlag: boolean = false;
  modalMessageObject!: ModalMessageInterface;

  createUser() {
    this.isFormValid = true;
    this.validateForm();
    Object.keys(this.isUserInvalid).forEach((key) => {
      if (this.isFormValid && this.isUserInvalid[key]) {
        this.showErrorsModal();
      }
    });
    if (this.arePasswordsNotEqual || this.userAlreadyExists) {
      this.showErrorsModal();
    }
    if (this.isFormValid && !this.userAlreadyExists) {
      this.userService.addElement(this.currentUser).subscribe({
        next: () => (this.flagNewUserCreated = true),
        error: (error) => {
          this.handleError(error);
        },
      });
    }
  }

  validateMail(mail: string): boolean {
    // Returns true if valid
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
  }

  validateUsername() {
    this.userService
      .checkUsername(this.currentUser.username)
      .subscribe((response) => (this.userAlreadyExists = response));
  }

  validateForm(): void {
    this.validateUsername();
    this.isUserInvalid.name =
      this.currentUser.name.length < 3 || this.currentUser.name.length > 25;
    this.isUserInvalid.surname =
      this.currentUser.surname.length < 3 ||
      this.currentUser.surname.length > 25;
    this.isUserInvalid.email = !this.validateMail(this.currentUser.email);
    this.isUserInvalid.username =
      this.currentUser.username.length < 4 ||
      this.currentUser.username.length > 20;
    this.isUserInvalid.passwordHash =
      this.currentUser.passwordHash.length < 7 ||
      this.currentUser.passwordHash.length > 15;
    this.arePasswordsNotEqual =
      this.currentUser.passwordHash != this.repitedPass;
  }

  showErrorsModal() {
    this.modalMessageObject = {
      header: `Hay errores en el formulario.`,
      confirm: 'Continuar editando',
    };
    this.modalMessageFlag = true;
    this.isFormValid = false;
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 0) {
      this.modalMessageObject = {
        header: 'Error',
        message: 'Hubo un error con el servidor.',
        confirm: 'Intentar más tarde',
      };
      this.modalMessageFlag = true;
    } else {
      this.modalMessageObject = {
        header: 'Hubo errores con el formulario.',
        message: error.error.message,
        confirm: 'Continuar editando',
      };
      this.modalMessageFlag = true;
    }
    this.isFormValid = false;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
