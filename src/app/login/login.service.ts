import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(dto: { email: string; password: string }) {
    return firstValueFrom(this.http.post('/api/login', dto));
  }

}