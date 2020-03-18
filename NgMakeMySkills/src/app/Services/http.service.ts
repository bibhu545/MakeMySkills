import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(url: string, data: any): Observable<any> {
    var response = this.http.post(url, data);
    return response;
  }

  getData(url: string): Observable<any> {
    var response = this.http.get(url);
    return response;
  }

}
