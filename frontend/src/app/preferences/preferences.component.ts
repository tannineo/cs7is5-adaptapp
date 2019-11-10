import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  preferences = ['Cat', 'Dog', 'Rabbit'];
  checkedList = [];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  preferencesClicked() {
    this.router.navigate(['/home']);
  }
  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedList.push(option);
    } else {
        this.checkedList.splice(this.checkedList.indexOf(option), 1);
    }
    console.log(this.checkedList);
  }
}
