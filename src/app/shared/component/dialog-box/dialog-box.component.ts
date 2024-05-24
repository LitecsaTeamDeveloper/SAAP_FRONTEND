import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxService } from '../../services/dialog-box.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  title: string;
  content: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogBoxService: DialogBoxService
  ) {
    this.title = data.title;
    this.content = data.content;
    this.dialogBoxService.setDialogRef(dialogRef);
  }


  onClose(): void {
    this.dialogRef.close();
  }
}