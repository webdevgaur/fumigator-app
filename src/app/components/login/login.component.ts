import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email!: string;
  password!: string;

  authService = inject(AuthService);

  signIn() {
    this.authService.login(this.email, this.password);
  }

}
