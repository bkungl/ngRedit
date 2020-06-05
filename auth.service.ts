import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
    authState;//: FirebaseAuthState = null;
    //authState;
    
    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe((auth) => {
              this.authState = auth;
            });
  }
    
    createNewUser(email, password){
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
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
    
    loginPass(email, password){
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
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
    }
    
  logout() {
    this.afAuth.auth.signOut();
     // this.router.naviget(['/']);
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
        return this.authenticated ? this.authState.auth : null;
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    
    

}