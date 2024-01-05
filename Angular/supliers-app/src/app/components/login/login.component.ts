import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private route: Router, private users: UsersService) {}
  public credentials: CredentialInterface = {
    username: '',
    password: '',
  };
  public isCredentialInvalid: boolean = false;

  login() {
    if (
      this.credentials.username == 'admin' &&
      this.credentials.password == 'admin'
    ) {
      this.isCredentialInvalid = false;
      localStorage.setItem('credentials', JSON.stringify(this.credentials));
      this.users.succesfullLogin();
      this.route.navigateByUrl('/');
    } else {
      this.isCredentialInvalid = true;
      this.credentials.password = '';
    }
  }
}
interface CredentialInterface {
  username: string;
  password: string;
}
