import { Component, OnInit } from '@angular/core';
import { DbAuthService } from '../db-auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';


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

  //flips the attendance of specified user at specified event
  public flipAttendance(memNum:number,eventIndex:number){

    this.dbAuth.flipAttendance(memNum, eventIndex)
  }


  //opens the event dialogue to create a new event
  openNewEventDialog(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '35ch'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  //opens the member dialogue to create a new member
  openNewMemberDialog(): void {
    this.scrollTo()
    console.log("OpenNewMemberDialog() Called")

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
