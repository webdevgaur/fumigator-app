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
  

  isUserLoggedIn: boolean = !!this.auth.currentUser;

  private router = inject(Router);

  ngOnInit(): void {
    this.user$.subscribe(user => {
      console.log(user);
    });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.router.navigate(['/home']);
    }, (error) => {
      alert(error.message);
      this.router.navigate(['/login']);
    })
  }

  logOut() {
    signOut(this.auth);
    this.router.navigate(['/login']);
  }


}
