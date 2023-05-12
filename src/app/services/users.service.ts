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
    return this._http.get<Users[]>(`https://json-server-teste.herokuapp.com/users`);
  }

  public getEstados(): Observable<Estados[]> {
    return this._http.get<Estados[]>(`https://json-server-teste.herokuapp.com/uf`);
  }

  public getCidades(): Observable<Cidades[]> {
    return this._http.get<Cidades[]>(`https://json-server-teste.herokuapp.com/estados`);
  }

  public getEstadoCivil(): Observable<EstadoCivil[]> {
    return this._http.get<EstadoCivil[]>(`https://json-server-teste.herokuapp.com/estadoCivil`);
  }

  public createUser(user: Users): Observable<Users> {
    return this._http.post<Users>(`https://json-server-teste.herokuapp.com/users`, user);
  }

  public updateUser(user: Users): Observable<Users> {
    return this._http.put<Users>(`https://json-server-teste.herokuapp.com/users/${user.id}`, user);
  }

  public deleteUser(user: Users): Observable<Users> {
    return this._http.delete<Users>(`https://json-server-teste.herokuapp.com/users/${user.id}`);
  }
}
