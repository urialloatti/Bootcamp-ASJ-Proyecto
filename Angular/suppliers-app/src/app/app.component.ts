import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './services/users.service';
import { ModalService } from './services/modal.service';

import { ModalRedirectInterface } from './interfaces/modalInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private route: Router,
    private users: UsersService,
    private modalService: ModalService
  ) {}

  title = 'Gestión de Compras';
  public isLogedIn: boolean = false;
  public modalRedirectFlag: boolean = false;
  public modalRedirectObject: ModalRedirectInterface = {
    header: 'Error',
    message: 'Hubo un error con el servidor.',
    path: '/404',
  };

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
    this.modalService.errorMessageFlag$.subscribe({
      next: (value) => (this.modalRedirectFlag = value),
    });
  }
}
