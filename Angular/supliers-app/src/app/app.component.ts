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
    this.users.checkCredentials$.subscribe((isUserValid) => {
      if (isUserValid) {
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
        this.route.navigateByUrl('/login');
      }
    });
    this.users.checkLoggedIn();
  }
}
