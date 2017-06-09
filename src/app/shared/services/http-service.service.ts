import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  get(url: string) {
    return this.http.get(url).map(res => res.json());
  }

  post(url: string, data: any) {

  }

}
