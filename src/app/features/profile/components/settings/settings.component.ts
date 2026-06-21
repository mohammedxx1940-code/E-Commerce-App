import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth-service/auth.service';
import { AnimationService } from '../../../../core/services/animation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit{
  profileForm: FormGroup;
  changeForm : FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  successMsg = signal('');
  errorMsg = signal('');
  successPasswordMsg = signal('');
  errorPasswordMsg = signal('');
  isAnimation = signal(true);
  routeService = inject(Router);
  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    });
    this.changeForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.pattern(/.{6}/)]],
      password: ['', [Validators.required, Validators.pattern(/.{6}/)]],
      rePassword: ['', [Validators.required, Validators.pattern(/.{6}/)]],
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
        this.isAnimation.set(false);
    } , 2000);
    const user = this.authService.userData();
    this.profileForm.patchValue({
      name : user.name ,
      email: user.email,
      phone: user.phone
    });
  }
  updateUser(){
    if(this.profileForm.invalid){
      this.profileForm.markAllAsTouched();
      return;
    }
    const data = {
      name: this.profileForm.value.name ,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone
    }
    this.successMsg.set('');
    this.errorMsg.set('');
    this.authService.updateCurrentUse(data).subscribe({
      next:(r:any) => {
        console.log("SUCCESS:", r);
        this.authService.userData.set(r.user);
        this.successMsg.set('Profile updated successfully');
        setTimeout(() => {
          this.successMsg.set('');
        } , 2000);
      } , error: (e) => {
        console.log(e);
        this.errorMsg.set('Profile updated error !!');
        setTimeout(() => {
          this.errorMsg.set('');
        } , 2000);
      }
    });
  }
  updateChangePassword(){
    if(this.changeForm.invalid){
      this.changeForm.markAllAsTouched();
      return;
    }
    if(this.changeForm.value.password !== this.changeForm.value.rePassword){
      this.errorPasswordMsg.set('Passwords do not match');
      return;
    }
    this.successPasswordMsg.set('');
    this.errorPasswordMsg.set('');
    this.authService.changeMyPassword(this.changeForm.value as any).subscribe({
      next:(r:any) => {
        console.log("SUCCESS:", r);
        this.authService.userData.set(r.user);
        this.successPasswordMsg.set('Password changed successfully');
        setTimeout(() => {
          this.successPasswordMsg.set('');
        } , 2000);
        this.changeForm.reset();
        this.routeService.navigate(['/login']);
      } , error: (e) => {
        console.log(e);
        this.errorPasswordMsg.set(e.error.message || 'Error changing password');
        setTimeout(() => {
          this.errorPasswordMsg.set('');
        } , 4000);
      }
    });
  }
}