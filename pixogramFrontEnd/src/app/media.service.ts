import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MediaData } from './models/MediaData';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private baseUrl = 'http://localhost:8003/upload';

  constructor(private http: HttpClient, private userService: UserService) { }

  StoreMedia(mediafile: FormData, id: number): Observable<any> {
    return this.http.post(this.baseUrl + '/storeImages/' + id, mediafile);
  }
  
  getUserMedia(id: number): Observable<any> {
    return  this.http.get(this.baseUrl + '/getUserMedia/' + id);
  }

  StoreData(mediafile: MediaData, id: number): Observable<object> {
    return this.http.put('http://localhost:8003/upload/storeData/' + id, mediafile);
  }

  StoreProfile(formData: FormData, id: number): Observable<any> {
    return this.http.post('http://localhost:8003/upload/storeProfile/' + id, formData);
  }

  getProfilePic(): Observable<any> {
    return this.http.get('http://localhost:8003/upload/getProfile/' + this.userService.id);
  }

}
