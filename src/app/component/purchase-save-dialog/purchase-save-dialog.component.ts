import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-save-dialog',
  templateUrl: './purchase-save-dialog.component.html',
  styleUrls: ['./purchase-save-dialog.component.css']
})
export class PurchaseSaveDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PurchaseSaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
