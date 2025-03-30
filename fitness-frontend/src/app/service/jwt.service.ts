import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../Member';

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

  public getMember(): Observable<any> {
    return this.http.get<any[]>(BASE_URL + 'member/all', {
      headers: this.createAuthorizationHeader(),
    });
  }

  public addMember(Member: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'member/add', Member, {
      headers: this.createAuthorizationHeader(),
    });
  }

  public updateMember(Member: any): Observable<any> {
    return this.http.put<any>(BASE_URL + 'member/update', Member, {
      headers: this.createAuthorizationHeader(),
    });
  }

  public deleteMember(MemberId: any): Observable<any> {
    return this.http.delete<any>(BASE_URL + 'member/delete/' + MemberId, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
