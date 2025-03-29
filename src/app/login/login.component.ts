import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  hidePassword = signal(true);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private loginService: LoginService) { }

  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      this.loginService.login(this.form.getRawValue()).then(() => {
        console.log('Login successful');
      }).catch((error) => {
        console.error('Login failed', error);
      }).finally(() => {
        this.loading.set(false);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // Implement forgot password logic here
  }

  onRegister() {
    console.log('Register clicked');
    // Implement register logic here
  }
}
