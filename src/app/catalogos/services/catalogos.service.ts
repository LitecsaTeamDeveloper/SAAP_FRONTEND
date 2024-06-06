import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs/operators';
import { API_URL } from '../../shared/constant';

@Injectable({
    providedIn: 'root'
})
export class CatalogosService {

private urlApi = API_URL;

    constructor(protected httpClient: HttpClient, private loadingService: LoadingService ) {   }

    public getCatNumeroParte(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listanumeroparte`);
    }

    public getCatDiametros(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listadiametros`);
    }

    public getCatUbicacion(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listaubicacion`);
    }

    public getCatEstatus(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listaestatus`);
    }

    public getCatGrado(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listagrado`);
    }


    public getCatRango(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listarango`);
    }    

    public getCatConexion(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listaconexion`);
    }    

    public getCatPozo(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Catalogos/listapozo`);
    }    
}