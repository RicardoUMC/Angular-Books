import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.passwordsMatchValidator],
      }
    );
  }

  get passwordMismatch(): boolean {
    return (
      this.registerForm.hasError('passwordMismatch') &&
      !!this.registerForm.get('confirmPassword')?.touched
    );
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.http
        .post<any>('http://localhost:PORT/api/register', formValue)
        .subscribe({
          next: (response) => {
            console.log('Registro exitoso:', response);
            const userId = response.id;

            localStorage.setItem('userId', userId.toString());

            this.router.navigate(['/collection']);
          },
          error: (error) => {
            console.error('Error al registrar usuario:', error.error);
            alert(error.error);
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
