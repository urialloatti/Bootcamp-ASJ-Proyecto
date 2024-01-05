import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

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
    let credentials: CredentialInterface = JSON.parse(
      localStorage.getItem('credentials') || '{}'
    ) as CredentialInterface;
    if (credentials.password !== 'admin' && credentials.password !== 'admin') {
      this.isLogedIn = false;
      this.route.navigateByUrl('/login');
    } else {
      this.isLogedIn = true;
    }
  }
}

interface CredentialInterface {
  username: string;
  password: string;
}
