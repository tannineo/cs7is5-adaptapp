import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  preferences = ['sports', 'pets']
  constructor() { }

  ngOnInit() {
  }
  preferencesClicked() {

  }
}
