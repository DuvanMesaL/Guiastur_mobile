import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LoginService } from './services/loginService/login.service';
import { TokenService } from '../auth/services/TokenService/Token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  animations: [
    trigger('logoAnimation', [
      state('initial', style({ transform: 'scale(0.5) rotate(-45deg)', opacity: 0 })),
      state('final', style({ transform: 'scale(1) rotate(0)', opacity: 1 })),
      transition('initial => final', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    trigger('titleAnimation', [
      state('initial', style({ transform: 'translateY(-20px)', opacity: 0 })),
      state('final', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('initial => final', animate('500ms 200ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    trigger('subtitleAnimation', [
      state('initial', style({ transform: 'translateY(-20px)', opacity: 0 })),
      state('final', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('initial => final', animate('500ms 400ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    trigger('inputAnimation', [
      state('unfocused', style({ transform: 'scale(1)', boxShadow: 'none' })),
      state('focused', style({ transform: 'scale(1.02)', boxShadow: '0 0 10px rgba(var(--ion-color-primary-rgb), 0.3)' })),
      transition('unfocused <=> focused', animate('200ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    trigger('buttonAnimation', [
      state('initial', style({ transform: 'translateY(20px)', opacity: 0 })),
      state('final', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('initial => final', animate('500ms 600ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  logoState = 'initial';
  titleState = 'initial';
  subtitleState = 'initial';
  emailState = 'unfocused';
  passwordState = 'unfocused';
  buttonState = 'initial';
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'info';

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private LoginService: LoginService,
    private TokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.logoState = 'final';
      this.titleState = 'final';
      this.subtitleState = 'final';
      this.buttonState = 'final';
    }, 100);
  }

  onFocus(field: string) {
    if (field === 'email') {
      this.emailState = 'focused';
    } else if (field === 'password') {
      this.passwordState = 'focused';
    }
  }

  onBlur(field: string) {
    if (field === 'email') {
      this.emailState = 'unfocused';
    } else if (field === 'password') {
      this.passwordState = 'unfocused';
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Signing in...',
      });
      await loading.present();

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.LoginService.login(email, password).subscribe(
        async response => {
          await loading.dismiss();
          this.notificationMessage = 'Login successful';
          this.notificationType = 'success';

          const authToken = response.token;
          const refreshToken = response.refresh_token;

          if (authToken && refreshToken) {
            this.TokenService.setCookie('auth_token', authToken, 60);
            this.TokenService.setCookie('refresh_token', refreshToken, 1440);

            const toast = await this.toastController.create({
              message: 'Logged in successfully!',
              duration: 2000,
              color: 'success'
            });
            toast.present();

            setTimeout(() => {
              this.router.navigate(['/home'], { replaceUrl: true });
            }, 2000);
          } else {
            this.notificationMessage = 'Login successful, but tokens were not found.';
            this.notificationType = 'warning';
          }
        },
        async error => {
          await loading.dismiss();
          this.notificationMessage = 'Login failed. Please check your credentials.';
          this.notificationType = 'error';

          const toast = await this.toastController.create({
            message: 'Login failed. Check your credentials.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    }
  }
}