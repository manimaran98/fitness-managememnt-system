import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: JwtService,
    private router: Router // Inject Router here
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  submitForm() {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert('Registration Success');
          localStorage.setItem('jwt', response.token); // Store JWT token
          this.router.navigateByUrl('/dashboard').then(() => {});
        }
      },
      (error) => {
        console.error('Registration failed:', error);
        alert('Registration Fail');
      }
    );
  }
}
