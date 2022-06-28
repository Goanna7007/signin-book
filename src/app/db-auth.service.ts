import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { BookComponent } from './book/book.component';
import { Station } from './station';

@Injectable({
  providedIn: 'root'
})
export class DbAuthService {
  
  
  title = 'signin-book';

  firebaseConfig = {
    apiKey: "AIzaSyBBXNVytGVGxHoDNnHIFaBGKGcgftI37NI",
    authDomain: "signin-book.firebaseapp.com",
    projectId: "signin-book",
    storageBucket: "signin-book.appspot.com",
    messagingSenderId: "165325223530",
    appId: "1:165325223530:web:2d254195b4bacf12cfbc13",
    measurementId: "G-PK3RTHVTXK"
  };

  app = initializeApp(this.firebaseConfig);

  db = getFirestore(this.app)
  stationDocRef = doc(this.db, 'stations/8')

  userEmail = ""

  station : Station | undefined;

  book : BookComponent | undefined;


  constructor() { 
    onAuthStateChanged(getAuth(), user => {
      console.log( `you are signed in as `, user)

      if (user != null && user.email != null){
        this.userEmail = user.email
        onSnapshot(this.stationDocRef, snapshot => {
          this.station = snapshot.data() as Station;
          console.log(this.station)


          let book = this.book
          setTimeout(function(){ 
            if (book != undefined){
              book.scrollTo();
            }
          }, 0);
        })
      }
      else{
        this.userEmail = ""
      }
        
    })
  }


  //returns true if the user is from the TFS
  public isUserFromTFS(){
    return this.userEmail.endsWith("fire.tas.gov.au")
  }

  signin(){
    const provider = new OAuthProvider('microsoft.com');

    provider.setCustomParameters({
      // Optional "tenant" parameter in case you are using an Azure AD tenant.
      // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
      // or "common" for tenant-independent tokens.
      // The default value is "common".
      tenant: 'fire.tas.gov.au'
    });

    const auth = getAuth();
    signInWithPopup(auth, provider)
  }


  


  //signs out the user
  public userSignOut(){
    signOut(getAuth())
  }


  //updates the document on firebase
  public updateFirestore(){
    setDoc(this.stationDocRef, this.station)
  }


  //flips the attendance of specified user at specified event
  public flipAttendance(memNum:number,eventIndex:number){


    if (this.station == undefined){
      console.log("Station undefined")
      return
    }
    
    if (eventIndex < this.station.events.length - 3)
    {
      console.log("Event too long ago")
      return
    }

    this.station.events[eventIndex].attendance[memNum] = !this.station.events[eventIndex].attendance[memNum]
    this.updateFirestore()
    
  }


  //adds and event
  public addEvent(description : string, number: string | undefined, red: boolean, date: string){
    this.updateEvent(null, description, number, red, date)
  }


  //called when the user clicks on a member and the database needs to be updated
  updateEvent(eventIndex: number | null, description: string, number: string | undefined, red: boolean, date: string) {
    if (this.station == undefined) {
      console.log("Station undefined")
      return
    }
    
    
    let attendance : boolean[] = []

    for (let _ in this.station.members) {
      attendance.push(false)
    }


    let event = {
      description: description,
      number: number,
      red: red,
      date: date,
      attendance: attendance
    }
    

    if (eventIndex == null){
      this.station.events.push(event);
    }
    else {
      this.station.events[eventIndex] = event;
    }
    
    
    
    console.log(this.station);
    this.updateFirestore();
  }
    
  




  //adds a member to the station
  public addMember(name: string){
    if (this.station != undefined){
      this.station.members.push(name)

      for (let i = 0; i < this.station.events.length; i++){
        this.station.events[i].attendance.push(false)
      }


      this.updateFirestore();
    }
    console.log("Station undefined")
  }



  //scrolls to an element
  public scrollTo(){
    let el = document.getElementById("addEventButton")

    if (el == null)
      return

    el.scrollIntoView()
  }
  

  //removes an event from the database
  deleteEvent(eventIndex: number) {
    this.station?.events.splice(eventIndex, 1)
    this.updateFirestore();
  }
}
