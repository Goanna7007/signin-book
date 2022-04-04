import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DbAuthService } from '../db-auth.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<EventDialogComponent>, public auth: DbAuthService) { }

  description = "";
  number : undefined | string = undefined;
  red = false;  
  date = new Date() 

  ngOnInit(): void {
  }


  create(){

    let dd = String(this.date.getDate())
    let mm = String(this.date.getMonth() + 1)
    let yyyy = this.date.getFullYear();
    let dateString = mm + '/' + dd + '/' + yyyy;
    this.auth.addEvent(this.description, this.number, this.red, dateString)

    this.dialogRef.close();
  }
}
