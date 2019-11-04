import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  name: string;
  pass: string;
  constructor(private router: Router) {
   }

  ngOnInit() {
  }
 loginClick(event) {
   if (this.name === 'a' && this.pass === 'a') {
     alert('Login Success')
     this.router.navigate(['/home']);
   } else {
     alert('Invalid Credentials')
   }

 }
}
