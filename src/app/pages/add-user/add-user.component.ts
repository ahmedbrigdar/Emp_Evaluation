import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NotficationService } from '../../services/notfication.service';
import { user } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: user = new user();
  user_form: FormGroup = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    DepartmentID: [1, Validators.required],
    NationalID: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    PhoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    Email: ['', [Validators.email, Validators.required]],
    IsAdmin: [false],
  });
  id = 0;
  pageNameString = 'Add Employee';
  constructor(private fb: FormBuilder, private api: ApiService,
    private notification: NotficationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['empID'] != null)
        this.id = params['empID'];
      console.log(this.id);
      if (this.id != 0 && this.id != null) {
        this.pageNameString = 'Edit Employee';
        this.api.getuserById(this.id).subscribe((res) => {
          if (res) {
            this.user_form.controls['FirstName'].setValue(res.firstName);
            this.user_form.controls['LastName'].setValue(res.lastName);
            this.user_form.controls['DepartmentID'].setValue(res.departmentID);
            this.user_form.controls['NationalID'].setValue(res.nationalID);
            this.user_form.controls['PhoneNumber'].setValue(res.phoneNumber);
            this.user_form.controls['Email'].setValue(res.email);
            this.user_form.controls['IsAdmin'].setValue(res.isAdmin);
          } else {
            this.router.navigateByUrl('login');
          }
        })
      }
    });
  }
  save() {
    Object.keys(this.user_form.controls).forEach(field => {
      const control = this.user_form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.user_form.status == 'VALID') {
      this.user.FirstName = this.user_form.controls['FirstName'].value;
      this.user.LastName = this.user_form.controls['LastName'].value;
      this.user.DepartmentID = this.user_form.controls['DepartmentID'].value;
      this.user.NationalID = this.user_form.controls['NationalID'].value;
      this.user.PhoneNumber = this.user_form.controls['PhoneNumber'].value;
      this.user.Email = this.user_form.controls['Email'].value;
      this.user.IsAdmin = this.user_form.controls['IsAdmin'].value;

      if (this.id == 0) {
        this.api.adduser(this.user).subscribe(res => {
          if (res.status == 0) {//not registerd
            this.notification.notfiy('error', res.message, 'top', 'right');
          } else {
            this.notification.notfiy('success', res.message, 'top', 'right');
            this.user_form.reset();
          }
          console.log(res.message);
        })
      } else {
        this.user.Id = this.id.toString();
        this.api.updateuser(this.user).subscribe(res => {
          if (res.status == 0) {//not registerd
            this.notification.notfiy('error', res.message, 'top', 'right');
          } else {
            this.notification.notfiy('success', res.message, 'top', 'right');
            this.user_form.reset();
            this.router.navigateByUrl('users');
          }
          console.log(res.message);
        })
      }

    }
  }
  close(){
    this.router.navigateByUrl('users');
  }
  clear() {
    this.user_form.reset();
  }
}
