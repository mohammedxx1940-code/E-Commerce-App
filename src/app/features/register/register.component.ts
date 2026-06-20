import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { LoaderComponent } from "../loader/loader.component";
import { AnimationService } from '../../core/services/animation.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent{
  fb = inject(FormBuilder);
  registerForm: FormGroup;
  authService = inject(AuthService);
  routerService = inject(Router);
  errorMsg = signal('');
  isLoading: boolean = false;
  animation = inject(AnimationService);
  @ViewChild('h') rrr!: ElementRef;
  getHide(hd: HTMLElement) {
    hd.classList.add('hidden');
  }
  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/.{6}/)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    });
  }
  registerNow() {
    this.animation.show()
    this.errorMsg.set('');
    if (!this.registerForm.valid) return;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).pipe(
        finalize(() => {
          this.animation.hide();
        })
      ).subscribe({
        next: (r: any) => {
          if (r.message == 'success') {
            this.isLoading = false;
            this.authService.handleSuccessAuth(r.token);
          }
        },
        error: (e) => {
          this.errorMsg.set(e.error.message);
          this.isLoading = false;
        },
      });
    }
  }
}