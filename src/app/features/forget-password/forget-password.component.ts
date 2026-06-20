import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth-service/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerSuccessComponent } from "../spinner-success/spinner-success.component";
import { SpinnerErrorComponent } from "../spinner-error/spinner-error.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, ReactiveFormsModule, SpinnerSuccessComponent, SpinnerErrorComponent, LoaderComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  step = signal(1);
  updateStep(newStep : number){
    this.step.set(newStep);
  }
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');
  forgetPasswordForm = this.fb.group({
    email : ['' , [Validators.required , Validators.email]] 
  })
  verifyResetCodeForm = this.fb.group({
    resetCode : ['' , [Validators.required]] 
  })
  resetPasswordForm = this.fb.group({
    email : ['' , [Validators.required , Validators.email]] ,
    newPassword : ['' , [Validators.required , Validators.minLength(6)]]
  })
  handleForgetPassword(){
    this.errorMsg.set('');
    if(!this.forgetPasswordForm.valid) return;
    if(this.forgetPasswordForm.valid){
      this.loading.set(true);
      this.authService.forgotPasswords(this.forgetPasswordForm.value).subscribe({
        next : (r) => {
          this.loading.set(false);
          this.step.set(2);
          this.resetPasswordForm.patchValue({
            email : this.forgetPasswordForm.value.email
          })
          this.forgetPasswordForm.reset();
        } ,
        error: (e) => {
          this.errorMsg.set(e.error.message);
          setTimeout(() => {
            this.errorMsg.set('');
          } , 1000)
          this.loading.set(false);
        },
      })
    }
  }
  handleVerifyResetCode(){
    if(this.verifyResetCodeForm.valid){
      this.loading.set(true);
      this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
        next : (r) => {
          this.loading.set(false);
          this.step.set(3);
        } ,
        error: (e) => {
          this.errorMsg.set(e.error.message);
          setTimeout(() => {
            this.errorMsg.set('');
          } , 1000)
          this.loading.set(false);
        },
      })
    }
  }
  handleResetPassword(){
    if(this.resetPasswordForm.valid){
      this.loading.set(true);
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next : (r) => {
          this.loading.set(false);
          this.step.set(4);
          //this.authService.handleSuccessAuth(r.token);
        } ,
        error: (e) => {
          this.errorMsg.set(e.error.message);
          setTimeout(() => {
            this.errorMsg.set('');
          } , 1000)
          this.loading.set(false);
        },
      })
    }
  }
}