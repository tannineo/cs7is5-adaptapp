import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import {Login} from '../shared/login.model'
import {UserService}  from '../shared/user.service'
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  @Input() details ={
    username: '',
    password_not_hashed: '',
  }
  
  constructor(private router: Router, private loginservice: UserService) {
   }

  ngOnInit() {
  }
 loginClick(event) {

  this.loginservice.loginUser(this.details)
  .subscribe((data:any)=>{
    
    if(data.msg=="OK"){
      localStorage.clear();
       localStorage.setItem('currentUser',JSON.stringify(data.result.token) );
       //alert(JSON.parse(localStorage.getItem('currentUser')));
    this.router.navigate(['/home']); }
    else
    {
      alert('Invalid Credentials')
    }
  })

 }
}
