import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbAuthService } from '../db-auth.service';


export interface DialogData {
  eventIndex: number | null
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<EventDialogComponent>, public auth: DbAuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  description = "";
  number : undefined | string = undefined;
  red = false;  
  date = new Date() 

  ngOnInit(): void {
    if (this.data.eventIndex != null){
      let event = this.auth.station?.events[this.data.eventIndex]
      this.description = event?.description ?? "";
      this.number = event?.number ?? "";
      this.red = event?.red ?? false;
      this.date = new Date(event?.date ?? "");
    }
  }


  create(){

    let dd = String(this.date.getDate())
    let mm = String(this.date.getMonth() + 1)
    let yyyy = this.date.getFullYear();
    let dateString = dd + '/' + mm + '/' + yyyy;

    if (this.data.eventIndex != null){
      this.auth.addEvent(this.description, this.number, this.red, dateString)
    }
    else{
      this.auth.updateEvent(this.data.eventIndex, this.description, this.number, this.red, dateString)
    }
    

    this.dialogRef.close();
  }
}
