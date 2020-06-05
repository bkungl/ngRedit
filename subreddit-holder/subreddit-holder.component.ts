import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-subreddit-holder',
  templateUrl: './subreddit-holder.component.html',
  styleUrls: ['./subreddit-holder.component.css']
})
export class SubredditHolderComponent implements OnInit {

    user = "Placeholder";
    subreddit = "Placeholder";
   
    creatingNew = true;//default to show posts
    
  title;
  description;
  picture; 
  dbc;
    lastPostID;
    ID: number;
    
    postSafeGuard = 0;
    
  constructor(db: AngularFirestore) {
      console.log("constructor");
    this.dbc = db;
  }

  ngOnInit() {
  }

    
  getID(){
        //get latest post id, then increment by 1
      console.log("start search");
        this.dbc.collection('posts').valueChanges()
            .subscribe(res => {
                if(this.postSafeGuard == 0){
                    this.insertNewPost(res);
                    this.postSafeGuard++;
                    res.unsubscribe();
                    
                }
                
            });
        //
        
    }
    
    insertNewPost(res){
        
        console.log(res);
        
        //sort first
                var temp = 0;
                console.log(res);
         /*       for(let post of res){
                    var num = +post.id.substring(1);
                    if(num > temp){
                        temp = num;
                    } else{
                    
                    }
                }*/
        
        temp = res.length;
            
        temp++;
        console.log(temp);
        
        if(this.postSafeGuard==0){
        this.dbc.collection('posts').doc("p"+temp).set({
                    picture: this.picture,
                    title: this.title,
                    description: this.description,
                    user: "hardcoded for now",
                    time: new Date(),
                    upvotes: 1,
                    downvotes: 0,
                    comments: [],
                    id: "p"+temp
                })
                .then(function() {
                    console.log("post successfully written!");
                    return;
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        
        
        //now update the subreddits array
        //first need to get subreddit from url
        //get the subreddit part
        var url = window.location.href;
        var subredditID = url.replace(/^https?:\/\//, '').split('/')[1];
            console.log(subredditID);
        
        //get the array of posts
            //valuechanges makes it repeatedly do it
            //get array from the subreddits' posts array, add 1 to it, update it
        var tempSubscr;
        tempSubscr = this.dbc.collection('posts').doc(subredditID).valueChanges()
            .subscribe(res => {
                var array = res.posts;
                array.push("p"+res.posts.length);
                //now update array
                console.log(this.postSafeGuard);
                if(this.postSafeGuard){
                  this.dbc.collection('subreddits').doc(subredditID).update({
                    posts: array 
                })
                .then(function() {
                    console.log("post successfully linked to subreddit!");
                    //this.reloadPage();
                     // tempSubscr.unsubscribe();
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });  
                }
                
        });
        
    }
    }
    
    

}
