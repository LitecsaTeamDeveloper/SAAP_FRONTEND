import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs/operators';
import { API_URL } from '../../shared/constant';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

private urlApi = API_URL;

    // public defaultHeaders = new HttpHeaders();
    // public configuration = new Configuration();
    // protected basePath = server.url;

    // constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    constructor(protected httpClient: HttpClient, private loadingService: LoadingService ) {   }

    public getUsuarios(cuerpo:any): Observable<any> {
        console.log('URL SERVICIO: ',this.urlApi);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(cuerpo);
        return this.httpClient.post<any>(`${this.urlApi}/Usuario/validausuario`, body, { headers: headers });
    }

    public getInventario(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Inventario/listainventario`);
    }

    // public getUsuarios(cuerpo:any): Observable<any> {
    //     const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     const body = JSON.stringify(cuerpo);
    //     this.loadingService.show();

    //     //return this.httpClient.get<any>(this.urlApi);

    //     return this.httpClient.get(this.urlApi)
    //     .pipe(
    //       finalize(() => this.loadingService.hide())
    //     );
    // }
 



}