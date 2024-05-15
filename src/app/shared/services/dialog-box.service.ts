import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {
  private dialogRef!: MatDialogRef<any>;

  setDialogRef(dialogRef: MatDialogRef<any>) {
    this.dialogRef = dialogRef;
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}