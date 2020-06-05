import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
    
    dbc;
    
  constructor() {
    //this.dbc = db;
  }
    
  ngOnInit() {
      
  }
    
    submitNew(){
       //see the the current subreddit exists
        //if yes send  amessage back to user
        //if no, add the new subreddit
    }

}
