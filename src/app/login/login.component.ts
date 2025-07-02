import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      this.http
        .post<any>('http://localhost:PORT/api/login', formValue)
        .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);

          const userId = response.id;
          localStorage.setItem('userId', userId.toString());

          this.router.navigate(['/collection']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error.error);
          alert(error.error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
