import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbAuthService } from '../db-auth.service';


export interface DialogData {
  eventIndex: number | null
  memNum: number | null
}

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AttendanceDialogComponent>,
    public dbAuth: DbAuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.data);
  }

}
