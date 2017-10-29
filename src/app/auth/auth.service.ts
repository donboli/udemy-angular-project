import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  init() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBi2OEV1-pwPjcP-xbuooM-Z15f4pUvzzQ',
      authDomain: 'ng-recipe-book-8d434.firebaseapp.com'
    });

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getToken();
      } else {
        this.store.dispatch(new AuthActions.Logout());
      }
    });
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Signup());
          this.getToken();
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Signin());
          this.router.navigate(['/']);
          this.getToken();
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.store.dispatch(new AuthActions.SetToken(token));
          if (token) {
            this.store.dispatch(new AuthActions.Signin());
          }
        }
      );
  }
}
