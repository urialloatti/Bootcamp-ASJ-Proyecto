import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../../interfaces/userInterface';
import { UsersService } from '../../../services/users.service';
import { ModalMessageInterface } from '../../../interfaces/modalInterface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent implements OnInit {
  constructor(private userService: UsersService) {}

  public currentUser: UserInterface = {
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

  ngOnInit(): void {
    this.userService.updateCounter();
  }

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
    if (this.isFormValid) {
      this.userService.addElement(this.currentUser).subscribe();
      console.log(this.currentUser);
      this.flagNewUserCreated = true;
    }
  }

  validateMail(mail: string): boolean {
    // Returns true if valid
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
  }

  validateUsername() {
    this.userService.checkUserExists$.subscribe(
      (response) => (this.userAlreadyExists = response)
    );

    this.userService.checkUsername(this.currentUser.username);
  }

  validateForm(): void {
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
    this.validateUsername();
  }

  showErrorsModal() {
    this.modalMessageObject = {
      message: `Hay errores en el formulario.`,
      confirm: 'Continuar editando',
    };
    this.modalMessageFlag = true;
    this.isFormValid = false;
  }

  hideModal(): void {
    this.modalMessageFlag = false;
  }
}
