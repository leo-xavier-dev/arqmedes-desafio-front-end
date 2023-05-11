import { Injectable } from '@angular/core';
import { Cidades, EstadoCivil, Estados, Users } from '../models/users.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient
  ) { }

  public getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(`http://localhost:3000/users`);
  }

  public getEstados(): Observable<Estados[]> {
    return this._http.get<Estados[]>(`http://localhost:3000/uf`);
  }

  public getCidades(): Observable<Cidades[]> {
    return this._http.get<Cidades[]>(`http://localhost:3000/estados`);
  }

  public getEstadoCivil(): Observable<EstadoCivil[]> {
    return this._http.get<EstadoCivil[]>(`http://localhost:3000/estadoCivil`);
  }

  public createUser(user: Users): Observable<Users> {
    return this._http.post<Users>(`http://localhost:3000/users`, user);
  }

  public updateUser(user: Users): Observable<Users> {
    return this._http.put<Users>(`http://localhost:3000/users/${user.id}`, user);
  }

  public deleteUser(user: Users): Observable<Users> {
    return this._http.delete<Users>(`http://localhost:3000/users/${user.id}`);
  }
}
