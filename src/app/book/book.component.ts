import { Component, OnInit } from '@angular/core';
import { DbAuthService } from '../db-auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { AttendanceDialogComponent } from '../attendance-dialog/attendance-dialog.component';


export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  numColumns: number[];
  numRows: number[];
  //constData: string[][];

  constructor(public dbAuth: DbAuthService, public dialog: MatDialog) { 
    this.numColumns = Array(20).fill(0).map((x,i)=>i);
    this.numRows = Array(40).fill(0).map((x,i)=>i);
    dbAuth.book = this;

    

    //this.constData = Array(20).fill(0).map((x,i)=>Array(40).fill(0).map((x,i)=>"O"));
  }

  ngOnInit(): void {
  }



  //open a dialogue to change an attendance
  openAttendanceDialog(eventIndex: number, memNum: number): void {


    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      width: '35ch',
      data: {eventIndex: eventIndex, memNum: memNum}
    });

    dialogRef.afterClosed().subscribe(result => {

    });

    //this.dbAuth.flipAttendance(memNum, eventIndex)
  }


  //opens the event dialogue to create a new event
  openNewEventDialog(eventIndex : number | null): void {


    if (eventIndex != null && eventIndex < (this.dbAuth.station?.events.length ?? 0) - 3)
    {
      console.log("Event too long ago")
      return
    }


    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '35ch',
      data: {eventIndex: eventIndex}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



  //asks the user if they want to move a member down a row
  public moveMemberDown(memNum:number){
    if (this.dbAuth.station != undefined && this.dbAuth.station.members.length > memNum + 1){
      
      if (confirm("Move this member down a row?")){

        var temp = this.dbAuth.station.members[memNum]
        this.dbAuth.station.members[memNum] = this.dbAuth.station.members[memNum+1]
        this.dbAuth.station.members[memNum+1] = temp

        this.dbAuth.station.events.forEach(event => {
          var temp = event.attendance[memNum]
          event.attendance[memNum] = event.attendance[memNum+1]
          event.attendance[memNum+1] = temp
        })

        this.dbAuth.updateFirestore()
      }
    }
  }



  //opens the member dialogue to create a new member
  openNewMemberDialog(): void {
    this.scrollTo()

    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: '35ch'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  //returns the initials of a name
  toInitials(name: string){
    return name.charAt(0).toUpperCase() + "" + name.split(" ")[1].charAt(0).toUpperCase();
  }


  //scrolls to the right most (mst recent events)
  public scrollTo(){
    let el = document.getElementById("addEventButton")

    if (el == null)
      return

    el.scrollIntoView({behavior: 'smooth'})
  }
  
}
