import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { SwUpdate } from '@angular/service-worker';
import { DbAuthService } from './db-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signin-book';


  

  constructor(private update: SwUpdate,public bdAuth: DbAuthService) {

    this.updateClient()

  }

  



  updateClient(){
    // if update avalible
    this.update.checkForUpdate().then(value => {
      if (value){
        if (confirm("Update avalible. Update now?")) {
          //ok
          document.location.reload()
        } else {
          //cancel
        } 
      }
    }

    )

  }

}
