import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  constructor(
    private router: Router
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
        this.token = null;
      }
    });
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
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
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
        }
      );

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
