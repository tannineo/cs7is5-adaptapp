import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  preferences = ['sports', 'pets']
  constructor(private router: Router) { }

  ngOnInit() {
  }
  preferencesClicked() {
    this.router.navigate(['/home']);
  }
}
