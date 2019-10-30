import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  name:string;
  pass:string;
  loginForm:NgForm;
  constructor(private router: Router) {
    
   }

  ngOnInit() {
  }
  onSubmit() {


}
 loginClick(event){
  if(this.name=="a"&&this.pass=="a"){
    alert("Login Success")
    this.router.navigate(['/home']);
   }
   else{
     alert("Invalid Credentials")
   }
   this.loginForm.reset();  
 }
}
