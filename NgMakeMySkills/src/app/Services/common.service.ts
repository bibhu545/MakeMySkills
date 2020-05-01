import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  routePath: Subject<String> = new Subject<String>();
  routePath$ = this.routePath.asObservable();

  private loading: Subject<boolean> = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  constructor() { }

  setRoutePath(value: string) {
    this.routePath.next(value);
  }

  setLoding(value: boolean) {
    this.loading.next(value);
  }

}
