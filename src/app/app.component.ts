import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private option = 'recipes';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBi2OEV1-pwPjcP-xbuooM-Z15f4pUvzzQ',
      authDomain: 'ng-recipe-book-8d434.firebaseapp.com'
    });
  }

  onNavigate(event) {
    this.option = event;
  }
}
