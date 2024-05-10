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

    public getInventario(): Observable<any> {
        return this.httpClient.get<any>(`${this.urlApi}/Inventario/listainventario`);
    }


}