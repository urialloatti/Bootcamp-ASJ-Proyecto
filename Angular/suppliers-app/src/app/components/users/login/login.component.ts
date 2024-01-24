import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users.service';
import { UserCredentialsInterface } from '../../../interfaces/userInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private route: Router, private users: UsersService) {}
  public credentials: UserCredentialsInterface = {
    username: '',
    password: '',
  };
  public isCredentialInvalid: boolean = false;

  login() {
    this.users.checkCredentials$.subscribe((isValid) => {
      if (isValid) {
        this.isCredentialInvalid = false;
        localStorage.setItem('credentials', JSON.stringify(this.credentials));
        this.route.navigateByUrl('/');
      } else {
        this.isCredentialInvalid = true;
        this.credentials.password = '';
      }
    });
    this.users.checkCredentials(this.credentials);
  }
}
