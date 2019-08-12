import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DataService {

  headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })

  constructor(private url: string,  private http: Http) {}

  getAll() {
    return this.http.get(this.url, { headers: this.headers });
  }
}
