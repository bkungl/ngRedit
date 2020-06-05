import { Injectable, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home-side',
  templateUrl: './home-side.component.html',
  styleUrls: ['./home-side.component.css']
})
@Injectable()
export class HomeSideComponent implements OnInit {

    authState; //FirebaseAuthState = null;
    
  constructor(public afAuth: AngularFireAuth) {
      afAuth.authState.subscribe((auth) => {
          this.authState = auth;
      })
  }
    createEmail;
    createPassword;
    createNewUser(){
        this.afAuth.auth.createUserWithEmailAndPassword(this.createEmail, this.createPassword)
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
            alert(errorMessage);
        }
        console.log(error);
        });

    }
    username;
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
     // this.afAuth.auth.signInWithCredential();

  }
    
    loginPassword;
    loginEmail;
    
    loginPass(){
        this.afAuth.auth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
            .catch(function(error) {
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
        
       /* console.log(this.afAuth);
        console.log(this.afAuth.auth);
        console.log(this.afAuth.auth.currentUser);
        console.log(this.afAuth.auth.currentUser);
        console.log(this.afAuth.auth.currentUser.email.split('@')[0]);
        this.afAuth.auth.currentUser.displayName = this.afAuth.auth.currentUser.email.split('@')[0];*/
        
    }
    
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

    sendMsg(){
        alert("Visit a subreddit to make a post");
    }
    
    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }
    
    // Returns current user
    get currentUser(): any {
        return this.authenticated ?this.authState.auth : null;
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    
}


/*

//if using a service, i scrapped this because subscription didn't work
afAuth;
    createEmail;
    createPassword;
    
  constructor(public auth: AuthService){
      console.log(auth);
      this.afAuth = auth;
  }

  ngOnInit() {
  }

    loginWithGoogle(){
        this.afAuth.login();
    }
    
    loginWithEmail(){
        this.afAuth.login(this.createEmail, this.createPassword);
    }
    
    createEmailandPass(){
       this.afAuth.createNewuser(this.createEmail, this.createPassword); 
    }
    
    logOut(){
        this.afAuth.logout();
    }
    
    sendMsg(){
        alert("Visit a subreddit to make a post");
    }
    */
