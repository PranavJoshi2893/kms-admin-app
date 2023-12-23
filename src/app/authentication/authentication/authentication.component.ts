import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, MatButtonModule, DialogModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  constructor(private _dialog: Dialog) { }

  openDialog() {
    this._dialog.open(RegisterComponent, {
      disableClose: true,
      autoFocus: false
    })
  }

}
