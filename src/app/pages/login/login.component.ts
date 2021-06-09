import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotficationService } from '../../services/notfication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  user = { email: '', password: '' };
  constructor(private router: Router, private api: ApiService,
    private fb: FormBuilder, private notification: NotficationService) { }


  ngOnInit(): void {
    localStorage.setItem('token', null);
    localStorage.setItem('id', null);
    localStorage.setItem('email', null);
    localStorage.setItem('isAdmin', null);

  }
  //Pa$$w0rd.
  login() {
    if (this.login_form.status == 'VALID')
      this.api.getToken(this.user.email, this.user.password).subscribe(res => {
        console.log(res);
        if (res.isAuthenticated) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.id);
          localStorage.setItem('email', res.email);
          localStorage.setItem('isAdmin', res.isAdmin);
          this.router.navigateByUrl('dashboard');
        } else {
          this.notification.notfiy('error', res.message,'bottom','center')
        }
      })
  }
}
