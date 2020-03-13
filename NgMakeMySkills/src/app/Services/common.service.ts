import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  routePath: Subject<String> = new Subject<String>();
  routePath$ = this.routePath.asObservable();
  constructor() { }

  setRoutePath(value: string) {
    this.routePath.next(value);
  }

}
