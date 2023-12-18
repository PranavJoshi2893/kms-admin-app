import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  @ViewChild('dialog') dialog!: ElementRef;

  openDialog() {
    this.dialog.nativeElement.showModal()
  }

  closeDialog() {
    this.dialog.nativeElement.close()
  }

}
