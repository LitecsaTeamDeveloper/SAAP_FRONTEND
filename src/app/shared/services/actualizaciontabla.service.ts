import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ActualizacionTablaService {
  private dialogCerradoSource = new Subject<void>();

  dialogCerrado$ = this.dialogCerradoSource.asObservable();

  notificarDialogCerrado() {
    this.dialogCerradoSource.next();
  }
}