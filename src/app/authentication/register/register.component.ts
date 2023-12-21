import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Output() closeDialog = new EventEmitter<void>();

  registerForm: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required]]
    })
  }

  toggleDialog() {
    this.closeDialog.emit();
  }

  onRegister() {
    if (this.registerForm.valid) {
      this._authService.userRegister(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response.message);
          this.closeDialog.emit();
        }, error: (error) => {
          console.log(error.error.message)
          this.registerForm.reset();
        }
      })

    }
  }

}
