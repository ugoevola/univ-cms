import { Component, OnInit, HostBinding } from '@angular/core';
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

  @HostBinding('class') class = 'flex-column';

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

  async submit() {
    if (this.loginForm.valid) {
      try {
        const logged = await this.loginService.login(this.loginForm.value);
        if (logged) {
          this.notificationService.showSuccess('page.login.notifications.success');
          this.router.navigate(['/app']);
        } else {
          this.notificationService.showWarning('page.login.notifications.badcrendential');
        }
      } catch (err) {
        this.notificationService.showWarning('page.login.notifications.connection-problem');
      }
    }
  }
}
