import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private tokenKey = 'jwt'; // Key for localStorage

  constructor(private http: HttpClient) {}

  /** Register a new user */
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest);
  }

  /** Login user and store token */
  login(loginRequest: any): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post<{ token: string }>(BASE_URL + 'login', loginRequest)
        .subscribe(
          (response) => {
            if (response.token) {
              localStorage.setItem(this.tokenKey, response.token);
            }
            observer.next(response);
            observer.complete();
          },
          (error) => observer.error(error)
        );
    });
  }

  /** Fetch protected API with JWT */
  hello(): Observable<any> {
    return this.http.get(BASE_URL + 'api/hello', {
      headers: this.createAuthorizationHeader(),
    });
  }

  /** Create authorization headers */
  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = this.getToken();
    let headers = new HttpHeaders();

    if (jwtToken) {
      headers = headers.set('Authorization', 'Bearer ' + jwtToken);
    }

    return headers;
  }

  /** Get the stored token */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Logout user */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
