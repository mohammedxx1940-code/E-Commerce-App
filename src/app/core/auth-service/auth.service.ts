import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserSideService } from '../services/browser-side.service';
import { environment } from '../../../environments/environment';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { IAddress, IUser } from '../model/api.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  group(arg0: { email: (string | ((control: AbstractControl) => ValidationErrors | null)[])[]; }) {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient);
  isLogged = signal(false);
  routerService = inject(Router);
  browserSideService = inject(BrowserSideService);
  token : WritableSignal<string | null> = signal(null);
  constructor(){ 
    if(this.browserSideService.isBrowserSide()){
      const token = localStorage.getItem('token');
      this.isLogged.set(!!token);
      this.token.set(token);
      this.saveUserData();
    }else{
      this.isLogged.set(false);
    }
  }
  register(data : any) : Observable<any>{
    return this.http.post(`${environment.baseURL}/api/v1/auth/signup` , data)
  }
  login(data : any) : Observable<any>{
      return this.http.post(`${environment.baseURL}/api/v1/auth/signin` , data)
  }
  logOut(){
      this.isLogged.set(false);
      this.routerService.navigate(['/login']);
      localStorage.removeItem('token');
      this.token.set(null);
      this.userData.set(null);
  }
  handleSuccessAuth(token : string){
    localStorage.setItem('token' , token);
    this.token.set(token);
    this.routerService.navigate(['/']);
    this.isLogged.set(true);
  }
  forgotPasswords(data : any) : Observable<any>{
    return this.http.post(`${environment.baseURL}/api/v1/auth/forgotPasswords` , data)
  }
  verifyResetCode(data : any) : Observable<any>{
    return this.http.post(`${environment.baseURL}/api/v1/auth/verifyResetCode` , data)
  }
  resetPassword(data : any) : Observable<any>{
    return this.http.put(`${environment.baseURL}/api/v1/auth/resetPassword` , data)
  }
  userData = signal<any>(null);
  //userData : WritableSignal<IUser | null> = signal(null);
  saveUserData() : void{
   const token = localStorage.getItem('token');
   if(token){
    const payload = token.split('.')[1];
    const decodedData  = JSON.parse(atob(payload));
    this.userData.set(decodedData);
   }
  }
  addAddress(data: IAddress){
    return this.http.post(`${environment.baseURL}/api/v1/addresses` , data);
  }
  getAddress(){
    return this.http.get(`${environment.baseURL}/api/v1/addresses`);
  }
  removeAddress(id : string){
    return this.http.delete(`${environment.baseURL}/api/v1/addresses/${id}`);
  }
  updateAddress(id : string , data  :any){
    return this.http.put(`${environment.baseURL}/api/v1/addresses/${id}` , data);
  }
  updateCurrentUse(data : {
    name : string;
    email : string;
    phone : string;
  }){
    return this.http.put(`${environment.baseURL}/api/v1/users/updateMe/` , data);
  }
  changeMyPassword(data : {
    currentPassword: string;
    password: string;
    rePassword: string;
  }){
     return this.http.put(
    `${environment.baseURL}/api/v1/users/changeMyPassword`,
     data
  );
  }
 }