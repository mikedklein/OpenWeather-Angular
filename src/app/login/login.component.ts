import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login(email: string, password: string): void {
    const auth = this.authService.login(email, password);
    if (auth !== null) {
      alert('Success!');
    } else {
      alert('Wrong username or password');
    }
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.login(f.value.username, f.value.password);
    } else {
      alert('Login is invalid!');
    }
  }
}
