//import { server } from '../../../../enviroments';
import { Injectable, Optional, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
// import { BASE_PATH } from 'app/constants/variables';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

private urlApi = 'http://localhost:5057/api/Usuario/validausuario'
//private urlApi = 'http://localhost:5057/api/Usuario/listausuario'

    // public defaultHeaders = new HttpHeaders();
    // public configuration = new Configuration();
    // protected basePath = server.url;

    // constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    constructor(protected httpClient: HttpClient, private loadingService: LoadingService ) {   }

    public getUsuarios(cuerpo:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = JSON.stringify(cuerpo);
        return this.httpClient.post<any>(this.urlApi, body, { headers: headers });
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