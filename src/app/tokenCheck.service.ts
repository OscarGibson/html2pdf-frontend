import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class TokenCheckService {
  constructor(private http: Http) {}
  sendToken(token:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Token ' + token)

    let options = new RequestOptions({
      headers: headers
    });
    return this.http.get('http://127.0.0.1:8000/rest-auth/user/?format=json', options)
        .map(response => response.json());
  }
}
