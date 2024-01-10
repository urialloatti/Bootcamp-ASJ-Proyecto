import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  logOut() {
    if (localStorage.getItem('credentials')) {
      localStorage.removeItem('credentials');
    }
  }
}
