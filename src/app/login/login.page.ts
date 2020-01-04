import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
declare var alertify: any;
//service
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  public loginForm: FormGroup;
  submitted = false;
  responseList: any = [];
  
  // validations
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'Ingrese un email valido' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 6 caracteres' },
      { type: 'pattern', message: 'La contraseña debe contener mayusculas, minusculas y numeros' }
    ]
  }

  constructor(private formBuilder: FormBuilder, private router: Router, public loginService: LoginService) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
      ]))
    });
  }

  ngOnInit() {
  }

  get f() { 
    return this.loginForm.controls; 
  }

  onClickSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      //send data form to service
      const data = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
      //service login
      this.loginService.login(data).then(res => {
        //set token to cookies
        this.responseList = res;
        //validation where generate error
        if (this.responseList.non_field_errors != null) {
          // send alert error
          alertify.error('Email o Contraseña Erronea');
        } else {
          Cookies.set('token', this.responseList.token);
          Cookies.set('email', this.loginForm.value.email);
          //redirect to home
          this.router.navigate(['/home'])
        }
      },
        err => alertify.error('Email o Contraseña Erronea')
      );
    }
  }
}

