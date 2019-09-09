import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private baseUrl = 'http://localhost:8003/api';

  constructor(private http: HttpClient) { }

  StoreFile(mediafile: Object): Observable<Object> {
    return this.http.post('http://localhost:8003/api/storeImages', mediafile);
  }
  getCustomerImages(id: number): Observable<any> {
    return  this.http.get(this.baseUrl+'/downloadFile/'+id);
  }
  // getCustomerImages1(id: number): Observable<any> {
  //   return  this.http.get(this.baseUrl+'/downloadFiles/'+id );
  // }
}
