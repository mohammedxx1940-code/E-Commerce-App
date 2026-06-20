import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  imports: [ReactiveFormsModule], 
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if(username == 'Mohammed 1940' && password === 'Nn@123456'){
      localStorage.setItem('Mohammed 1940' , 'true');
      this.router.navigate(['/admin']);
    }else{
      alert('Wrong credentials')
    }
  }
}