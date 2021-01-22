import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataServiceService} from '../services/data-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isAuthError = false;

  loginForm = new FormGroup({
    login: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
  });

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(): any {
    const loginData = {
      username: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
    };
    this.isAuthError = false;
    this.dataService.login(loginData).then(response => {
      this.router.navigate(['users']);
    }).catch(reason => {
      this.isAuthError = true;
    });
  }




}
