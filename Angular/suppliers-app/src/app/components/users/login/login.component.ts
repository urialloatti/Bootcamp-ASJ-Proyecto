import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users.service';
import { UserCredentialsDTO } from '../../../interfaces/userInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private route: Router, private users: UsersService) {}
  public credentials: UserCredentialsDTO = {
    username: '',
    passwordHash: '',
  };
  public triedToLogIn: boolean = false;
  public isCredentialInvalid: boolean = false;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.users.checkCredentials$.subscribe((isValid) => {
      if (isValid) {
        this.isCredentialInvalid = false;
        localStorage.setItem('credentials', JSON.stringify(this.credentials));
        this.route.navigateByUrl('/');
      } else {
        this.isCredentialInvalid = true;
        this.credentials.passwordHash = '';
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  login() {
    this.triedToLogIn = true;
    this.users.checkCredentials(this.credentials);
  }
}
