import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DbAuthService } from '../db-auth.service';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {

  name = ""

  constructor(    public dialogRef: MatDialogRef<MemberDialogComponent>, public auth: DbAuthService) { }

  ngOnInit(): void {
  }

  create(){
    this.auth.addMember(this.name)

    this.dialogRef.close();
  }

}
