import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './services/users.service';
import { UserCredentialsInterface } from './interfaces/userInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private route: Router, private users: UsersService) {}

  title = 'Gestión de Compras';
  public isLogedIn: boolean = false;

  ngOnInit(): void {
    this.checkCredentials();
    this.users.checkCredentials$.subscribe(() => {
      this.checkCredentials();
    });
  }

  checkCredentials() {
    let credentials: UserCredentialsInterface = JSON.parse(
      localStorage.getItem('credentials') || '{}'
    ) as UserCredentialsInterface;
    if (credentials.password !== 'user' && credentials.password !== 'admin') {
      this.isLogedIn = false;
      this.route.navigateByUrl('/login');
    } else {
      this.isLogedIn = true;
    }
  }
}
