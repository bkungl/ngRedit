import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-subreddit-header',
  templateUrl: './subreddit-header.component.html',
  styleUrls: ['./subreddit-header.component.css']
})
export class SubredditHeaderComponent implements OnInit {

    subredditInfo;
    subredditStr;
    
  constructor(db: AngularFirestore) { 
      
      //get url
      //get url
        this.subredditStr = window.location.href;
      
        //just get the subreddit part -- WORKS
        this.subredditStr = this.subredditStr.replace(/^https?:\/\//, '').split('/')[1];
      
    db.collection('subreddits').doc(this.subredditStr).valueChanges()
      .subscribe(res => {
        this.subredditInfo = res;
    })
  }

  ngOnInit() {
  }

}
