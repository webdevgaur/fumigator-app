import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Injectable, OnInit, inject } from '@angular/core';
import { getAuth } from '@firebase/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  auth: Auth = getAuth();

  user$: Observable<any> = authState(this.auth);

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

  logOut() {
    signOut(this.auth);
    localStorage.removeItem('token');    
    this.router.navigate(['/login']);
  }


}
