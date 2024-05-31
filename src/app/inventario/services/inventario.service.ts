import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs/operators';
import { API_URL } from '../../shared/constant';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {

private urlApi = API_URL;

    constructor(protected httpClient: HttpClient, private loadingService: LoadingService ) {   }

    public getInventario(compania: number): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Inventario/listainventario/${compania}`);
    }

    public regInventario(cuerpo:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(cuerpo);
        return this.httpClient.post<any>(`${this.urlApi}/Inventario/registrainventario`, body, { headers: headers });
    }

    public getInventarioIndividual(inventario: number): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Inventario/obtieneinventario/${inventario}`);
    }

    public deleteInventario(cuerpo:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(cuerpo);
        return this.httpClient.post<any>(`${this.urlApi}/Inventario/eliminainventario`, body, { headers: headers });
    }

}