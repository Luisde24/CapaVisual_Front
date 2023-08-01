import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from './transacciones.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienthttpService {

  private http: HttpClient;
  private baseUrl: string = "";
  private authUrl: string = "";


  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) 
    { 
        this.http = http;
        this.baseUrl = baseUrl || "";
        this.authUrl = "http://localhost:8000";
    }

    authorization(url: string): Observable<any> {

      return this.http.get<any>(this.authUrl + url);
    }

    // post(url: string, body: any | null): Observable<any> {

    //   const appToken = sessionStorage.getItem('app_Token');
      // const bearerToken = 'Bearer ' + JSON.parse(appToken);
  
       // const bodyEncrypt = this.encryptData(JSON.stringify(body));
  
       // return this.http.post<any>(this.baseUrl + url, { data: bodyEncrypt }, { headers: new HttpHeaders().set('Authorization', bearerToken) });
    // }

}

