import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Injectable, OnInit, inject } from '@angular/core';
import { getAuth } from '@firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  auth: Auth = getAuth();

  private router = inject(Router);

  ngOnInit(): void {
    
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }, (error) => {
      alert(error.message);
      this.router.navigate(['/login']);
    })
  }

  logout() {
    signOut(this.auth);
    localStorage.removeItem('token');    
    this.router.navigate(['/login']);
  }


}
