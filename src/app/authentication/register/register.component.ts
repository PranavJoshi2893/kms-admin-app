import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Output() closeDialog = new EventEmitter<void>();

  registerForm: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder) { }

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
      console.log(this.registerForm.value)
    }
  }

}
