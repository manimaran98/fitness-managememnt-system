import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './service/jwt.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Fitness Management System';
  isLoggedIn = false;
  constructor(private jwtService: JwtService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.jwtService.isLoggedIn();
  }

  logout() {
    this.jwtService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
