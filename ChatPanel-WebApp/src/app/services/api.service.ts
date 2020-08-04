import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { constants } from '../utils/constants';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  private prepareRequestHeaders() {
    const defaultHeaders = constants.headers;
    if (this.authenticationService.getAccessToken()) {
      defaultHeaders['authorization'] ='Token '+ this.authenticationService.getAccessToken();
    }
    return new HttpHeaders(defaultHeaders);

  }

  //for get method
  public getCallback(url: string): Observable<any> {
    const finalUrl = constants.apiBaseURL + url;
    console.log("finalUrl",finalUrl)

    const httpHeaders = this.prepareRequestHeaders();
    console.log(httpHeaders)
    return this.http.get(finalUrl, { headers: httpHeaders })
      .pipe(
        tap(
          response => {
            return response;
          },
          error => {
           // this.handleError(error, 'GET', finalUrl);
          }
        )
      );
  }
  //for post method
  public postCallback(url: string, body?: Object): Observable<any> {
    const finalUrl = constants.apiBaseURL + url;
    console.log("finalUrl",finalUrl)
    
    if (!body) {
      body = {};
    }
    const httpHeaders = this.prepareRequestHeaders();

    return this.http.post(finalUrl, body, { headers: httpHeaders })
      .pipe(
        tap(
          response => {
            console.log("1",response)
            return response;
          },
          error => {
            console.log("err")
         //   return error
           // this.handleError(error, 'POST', finalUrl);
          }
        )
      );
  }

}
