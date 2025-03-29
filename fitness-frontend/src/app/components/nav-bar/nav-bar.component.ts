import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavbarComponent implements OnInit {
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
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
