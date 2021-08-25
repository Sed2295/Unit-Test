import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API:string = 'https://api.github.com';
  constructor(private http:HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.API}/users`)
  }
}
