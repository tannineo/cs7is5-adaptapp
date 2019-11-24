import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {Registration} from '../shared/registration.model'
import {UserService}  from '../shared/user.service'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  //register:Registration;
  @Input() details = {
    username: '',
    password_not_hashed: '',
    email: ''
  };

  constructor(private router: Router, private registerservice: UserService) {
  }

  ngOnInit() {
  }

  registerClicked() {
    // this.register.username=this.username;
    // this.register.password_not_hashed=this.password_not_hashed;
    // this.register.email=this.email;
    this.registerservice.registerUser(this.details)
    .subscribe((data: any) => {
      if (data.msg === 'OK') {
        alert('Registration Success');
      this.router.navigate(['/']);
      } else {
        alert('Registration Failed');
      }
    });
   }
}
