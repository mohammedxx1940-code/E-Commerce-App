import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../admin.service';
import { IUser } from '../../../core/model/api.interface';

@Component({
  selector: 'app-users-admin',
  imports: [],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css',
})
export class UsersAdminComponent implements OnInit{
    adminService = inject(AdminService);
    users = signal<IUser[]>([]);
    getAllUsers(){
    this.adminService.getAllUsers().subscribe({
    next : (r:any) => {
      console.log(r);
      this.users.set(r.users);
    } , 
    error : (e) => {
      console.log(e);
    }
  })
}
    ngOnInit(): void {
        this.getAllUsers();
    }
}