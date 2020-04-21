import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.commonService.setLoding(true);
    return next.handle(req).pipe(finalize(() => {
      setTimeout(() => {
        this.commonService.setLoding(false);
      }, 700);
    }));
  }

  postData(url: string, data: any): Observable<any> {
    var response = this.http.post(url, data);
    return response;
  }

  getData(url: string): Observable<any> {
    var response = this.http.get(url);
    return response;
  }

}
