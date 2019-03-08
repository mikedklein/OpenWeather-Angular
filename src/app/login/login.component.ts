import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(email: string, password: string): void {
    const auth = this.authService.login(email, password);
    if (auth !== null) {
      this.router.navigate(['/login']);
    } else {
      alert('Wrong username or password');
    }
  }
  // TODO should type this.
  onSubmit(f) {
    if (f.valid) {
      this.login(f.value.username, f.value.password);
    } else {
      alert('Login is invalid!');
    }
  }
}
