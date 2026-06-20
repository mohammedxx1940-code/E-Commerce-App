import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder , ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from "../alert/alert.component";
import { LoaderComponent } from "../loader/loader.component";
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AlertComponent, RouterLink, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  routerService = inject(Router);
  errorMsg = signal('');
  loading = signal(false);
  animation = inject(AnimationService);
  @ViewChild('h') rrr!: ElementRef;
  getHide(hd: HTMLElement) {
    hd.classList.add('hidden');
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  handleLogin(){
    this.animation.show();
    this.errorMsg.set('');
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.loading.set(true);
      this.authService.login(this.loginForm.value).subscribe({
        next : (r) => {
          this.animation.hide();
          this.loading.set(false);
          this.authService.handleSuccessAuth(r.token);
            localStorage.setItem('userToken', r.token);
            this.authService.saveUserData();
        } ,
        error : (e) => {
          this.animation.hide();
          this.loading.set(false);
          console.log(e.error.message);
          this.errorMsg.set(e.error.message);
        }
      })
    }
  }
}