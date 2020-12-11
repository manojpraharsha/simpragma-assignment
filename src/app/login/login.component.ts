import { Component, OnInit } from '@angular/core';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // 
  submitted: boolean = false;
  userNameError: boolean = false;
  passwordError: boolean = false;
  userNameAndpasswordError: boolean = false;
  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder, private router: Router) { this.mainForm() }

  ngOnInit(): void {

  }
  mainForm() {
    return this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get myForm() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => this.loginValidation(json, this.loginForm.value.userName, this.loginForm.value.password))
    }
  }
  loginValidation(data: [], userName: String, password: String) {
    let filterData = data.filter((user) => { return (user['email'] === userName || user['username'] === userName) });
    if (filterData[0] != undefined) {
      let id = filterData[0]['id'];
      if (password != '1234') {
        this.passwordError = true;
      } else {
        this.router.navigate(['/dashboard/', id]);
      }
    } else {
      this.userNameError = true;
    }
  }

}
