import { Injectable, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
//import {AngularFire} from 'angularfire2';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';



@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css'],
  providers: [AngularFireDatabase]
})
export class SubredditComponent implements OnInit {

    subredditStr;
  //constructor() { }
    
    subreddit;
    final_data: Array<any> = [];
    loading: boolean = true;
  
    items;//: Observable<any[]>;
    test: Observable<any[]>;
    
    dbposts;
    
    postids;
    
    postsCol;
    posts;
    votes;
    
    score;
    scoreHTML: HTMLElement;
    
    url;
    
    temp;
    
    postArray = new Array();
    
    //interface Post{}
    
    constructor(db: AngularFirestore) {
        //get url
        this.subredditStr = window.location.href;
      
        //just get the subreddit part -- WORKS
        this.subredditStr = this.subredditStr.replace(/^https?:\/\//, '').split('/')[1];
        
        //for html routing
        this.url = this.subredditStr;
        
        //for loading before subreddit chosen, shouldnt occur anymore
        if(this.subredditStr === ""){
            this.subredditStr = "aww";
            console.log("fixed");
        }
        
        //steps:
        //get subreddit
        this.items = db.collection('subreddits').doc(this.subredditStr).valueChanges()
            .subscribe(res => {
                //console.log(res);
                        
                //for use in subreddit styling
                this.subreddit = res;
            
                //now, we get the posts
                for (var item of res.posts) {//this error is ok.
                    this.posts = db.collection('posts').doc(item).valueChanges()
                        .subscribe(res => {
                            //populate post data into the array
                            this.postArray.push(res);
                            //console.log(res);
                            //this.score = res.upvotes - res.downvotes;//idk if this works
                        });
                }
            });
    }
    

  ngOnInit() {
    
  }

    upVote(index) {
        //we need to update the database
        //get the current number of upvotes
        //var temp = this.postArray[index][7];
        //console.log(temp + "text");
        
        //display the new score
        
        //checkScore();
    }

    downVote(index) {
        //update database, add one downvote
        
        //display the new score
        
        //checkScore();
    }

    checkScore(index) {
        if (this.score < 0) {
            this.score.style.color = "#FF586C";
        } else if (this.score > 0) {
            this.score.style.color = "#6CC576";
        } else {
            this.score.style.color = "#666666";
        }
    }

}
