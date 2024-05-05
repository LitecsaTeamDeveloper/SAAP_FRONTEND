import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

private urlApi = 'https://rickandmortyapi.com/api/character/640'
    
    constructor(private http: HttpClient ) {   }

    public getUsuarios(): Observable<any> {
        return this.http.get<any>(this.urlApi);
    }

 



}