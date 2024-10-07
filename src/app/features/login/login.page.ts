import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AnimationController, LoadingController, ToastController } from '@ionic/angular';
import { LoginService } from './services/loginService/login.service';
import { TokenService } from '../auth/services/TokenService/Token.service';

@Component({
  selector: 'app-login',
  template: `
    <ion-content class="ion-padding">
      <div class="login-container">
        <div class="logo-container" [@logoAnimation]="logoState">
          <ion-icon name="lock-closed" class="logo-icon"></ion-icon>
        </div>
        <h1 [@titleAnimation]="titleState">Welcome Back</h1>
        <p [@subtitleAnimation]="subtitleState">Sign in to your account</p>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <ion-item [@inputAnimation]="emailState" lines="full">
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" formControlName="email" (ionFocus)="onFocus('email')" (ionBlur)="onBlur('email')"></ion-input>
          </ion-item>

          <ion-item [@inputAnimation]="passwordState" lines="full">
            <ion-label position="floating">Password</ion-label>
            <ion-input [type]="showPassword ? 'text' : 'password'" formControlName="password" (ionFocus)="onFocus('password')" (ionBlur)="onBlur('password')"></ion-input>
            <ion-button fill="clear" slot="end" (click)="togglePassword()">
              <ion-icon [name]="showPassword ? 'eye-off' : 'eye'"></ion-icon>
            </ion-button>
          </ion-item>

          <ion-button expand="block" type="submit" [disabled]="loginForm.invalid" class="login-button" [@buttonAnimation]="buttonState">
            <ion-icon name="log-in" slot="start"></ion-icon>
            Sign In
          </ion-button>
        </form>
      </div>
    </ion-content>
  `,
  styles: [`
    .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .logo-container {
    width: 100px;
    height: 100px;
    background: var(--ion-color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .logo-icon {
    font-size: 3rem;
    color: white;
  }

  .login-form {
    width: 100%;
  }

  .login-button {
    margin-top: 2rem;
  }

  ion-item {
    --padding-start: 0;
    --inner-padding-end: 0;
    margin-bottom: 1rem;
  }

  ion-button[fill="clear"] {
    --color: var(--ion-color-medium);
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--ion-color-medium);
    margin-bottom: 2rem;
  }
  `],
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
    private animationCtrl: AnimationController,
    private LoginService: LoginService,
    private TokenService : TokenService,
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
          this.notificationMessage = 'Login exitoso';
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
            this.notificationMessage = 'Login exitoso, pero los tokens no se encontraron.';
            this.notificationType = 'warning';
          }
        },
        async error => {
          await loading.dismiss();
          this.notificationMessage = 'Login fallido. Verifica tus credenciales.';
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