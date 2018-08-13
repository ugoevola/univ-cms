import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { InexysNotificationService } from '../../common/ngtools/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  providers: [LoginService]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: InexysNotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).then((logged) => {
        if (logged) {
          this.notificationService.showSuccess('Login successfull');
          this.router.navigateByUrl('/home');
        } else {
          this.notificationService.showWarning('Bad credential');
        }
      });
    }
  }
}
