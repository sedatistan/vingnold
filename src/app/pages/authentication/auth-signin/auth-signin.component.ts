import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthServiceProxy } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authServiceProxy: AuthServiceProxy
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authServiceProxy.login(this.loginForm.controls["username"].value, this.loginForm.controls["password"].value)
      .subscribe(
        (result: any) => {
          debugger;
          let res=JSON.stringify(result);
          localStorage.setItem("currentUser", res);
          this.router.navigate(["/home-page-admin"]);
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        });
  }
}
