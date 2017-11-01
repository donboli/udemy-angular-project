import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducers';
import credentials from '../../../credentials.json';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
  constructor(
    private store: Store<fromApp.AppState>
  ) {
    firebase.initializeApp(credentials);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.store.dispatch(new AuthActions.Signin());
      } else {
        this.store.dispatch(new AuthActions.Logout());
      }
    });
  }
}
