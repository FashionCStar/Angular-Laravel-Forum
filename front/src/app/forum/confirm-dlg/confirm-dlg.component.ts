import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';;

@Component({
  selector: 'app-confirm-dlg',
  templateUrl: './confirm-dlg.component.html',
  styleUrls: ['./confirm-dlg.component.scss']
})
export class ConfirmDlgComponent implements OnInit {

  msg: string;
  constructor(
      public dialogRef: MatDialogRef<ConfirmDlgComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.msg = data.msg;
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  onYes() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}