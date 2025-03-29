import { Component } from '@angular/core';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  message: string | undefined;
  jwtService: any;
  router: any;

  constructor(private service: JwtService) {}

  ngOnInit() {
    this.hello();
  }

  hello() {
    this.service.hello().subscribe((response) => {
      console.log(response);
      this.message = response.message;
    });
  }

  logout() {
    this.jwtService.logout();
    this.router.navigate(['/login']);
  }
}
