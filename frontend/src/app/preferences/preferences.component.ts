import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  preferences = ['butterfly', 'dog', 'ox', 'squirrel', 'cat', 'elephant', 'sheep', 'chicken', 'horse', 'spider'];
  checkedList = [];
  constructor(private router: Router, private preferenceService: UserService) { }

  ngOnInit() {
  }
  preferencesClicked() {
    this.preferenceService.setPreferencesOfUser({tags: this.checkedList})
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          this.router.navigate(['/home']);
        } else {
          console.log('Preferences not set');
        }
    });
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
