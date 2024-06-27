import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs/operators';
import { API_URL } from '../../shared/constant';

@Injectable({
    providedIn: 'root'
})
export class OperacionService {

private urlApi = API_URL;

    constructor(protected httpClient: HttpClient, private loadingService: LoadingService ) {   }

    public getInventarioDisponible(cuerpo:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(cuerpo);
        return this.httpClient.post<any>(`${this.urlApi}/Operacion/listainventariodisponible`, body, { headers: headers });
    }

    public regMoverTP(cuerpo:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(cuerpo);
        return this.httpClient.post<any>(`${this.urlApi}/Operacion/movimientotp`, body, { headers: headers });
    }
}

