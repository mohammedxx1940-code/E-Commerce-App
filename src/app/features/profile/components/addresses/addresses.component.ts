import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../../core/auth-service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  imports: [ ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent implements OnInit{
  authService = inject(AuthService);
  addresses = signal<any[]>([]);
  editingId = signal<string | null>(null);
  addressForm = new FormGroup({
    name : new FormControl('' , Validators.required) , 
    details : new FormControl('' , Validators.required),
    phone : new FormControl('' , Validators.required),
    city : new FormControl('' , Validators.required)
  });
  @ViewChild('dom') domRef !: ElementRef;
  formShow(sh : HTMLElement){
    sh.classList.remove('hidden');
  }
  formHide(hd : HTMLElement){
    hd.classList.add('hidden');
  }
  addUserAddress(){
    this.addressForm.markAllAsTouched();
    if(this.addressForm.invalid){return;}
    this.authService.addAddress(this.addressForm.value as any).subscribe({
      next : (r:any) =>{
        this.addresses.update(oldAddresses => [...oldAddresses , r.data]);
        this.addressForm.reset();
        this.getAdrresses();
        this.formHide(this.domRef.nativeElement);
        console.log( 'r ==>' , r);
      } ,
      error : (e) => {
        console.log(e);
      }
    });
  }
  getAdrresses(){
    this.authService.getAddress().subscribe({
      next : (r:any) => {
        console.log('GET =>', r);
        this.addresses.set(r.data);
      }
    });
  }
  editAddress(address : any){
    this.editingId.set(address._id);
    this.addressForm.patchValue({
      name : address.name , 
      details: address.details,
      phone: address.phone,
      city: address.city
    });
    window.scrollTo({
      top : 0 , 
      behavior : 'smooth'
    });
  }
  saveAddress(){
    const id = this.editingId();
    if(!id) return;
    this.authService.updateAddress(id , this.addressForm.value).subscribe({
      next:(r:any) => {
        this.addresses.update(items =>
        items.map(item =>
          item._id === id
          ? r.data
          : item
        )
      );
        this.editingId.set(null);
        this.addressForm.reset();
        this.getAdrresses();
      } ,
      error : (e) => {
        console.log(e);
      }
    });
  }
  deleteAddress(id : string){
    this.authService.removeAddress(id).subscribe({
      next : (r) => {
        this.addresses.update(items => items.filter(item => item._id !== id));
      } , error : (e) => {
        console.log(e);
      }
    });
  }
  clearAllAddresses(){
    const requests = this.addresses().map(item => this.authService.removeAddress(item._id));
    forkJoin(requests).subscribe({
      next : () => {
        this.addresses.set([]);
        this.editingId.set(null);
        this.addressForm.reset();
      }
    });
  }
  ngOnInit(): void {
    this.getAdrresses();
  }
}