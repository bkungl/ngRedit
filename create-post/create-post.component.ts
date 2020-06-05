import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

    user = "Placeholder";
    subreddit = "Placeholder";
    
  title;
  description;
  picture; 
  dbc;
    lastPostID;
    ID: number;
    
    db5;
    
    totalPosts;
    postsArrForSub = new Array();
    
  constructor(db: AngularFirestore, db5: AngularFirestore) {
      console.log("constructor");
      this.dbc = db;
      this.db5 = db5;
      
      
      //get the how many posts there are total
      db.collection('posts').valueChanges()
        .subscribe(res => {
            this.totalPosts = res.length + 1; 
      });
      
      
      //get the array of posts at a subreddit
      //get subreddit from the url
      var tmpurl = window.location.href;
      var tmpsubredditID = tmpurl.replace(/^https?:\/\//, '').split('/')[1];
      this.subreddit = tmpsubredditID;
      db.collection('subreddits').doc(tmpsubredditID).valueChanges()
        .subscribe(res => {
            this.postsArrForSub = res.posts; 
      });
      
  }

  ngOnInit() {
  }

sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
    
    
    temp;
    temp2;
    temp3;
    
    newID;
    
    safeguard = 0;
  getID(){ 
      
      //make sure picture is ok, only accept jpeg or png or gif
      if((((
          (this.picture.split('.')[this.picture.split('.').length-1]) == "png") 
          || (this.picture.split('.')[this.picture.split('.').length-1]) == 'gif')
          || this.picture.split('.')[this.picture.split('.').length-1]) == 'jpeg'){
          //do nothing
      }
      else{
          alert(".jpeg, .gif, .png only");
          this.picture = "https://cdn-images-1.medium.com/max/1600/1*AHbJNltWXa_7GwHBecz7PQ.jpeg";
      }
      
      
      this.newID = "p" + this.totalPosts;
      
      //add the link to the array 
      this.postsArrForSub.push(this.newID);
      
      //add new post to posts collection
      
                var url = window.location.href;
                var subredditID = url.replace(/^https?:\/\//, '').split('/')[1];
      
                console.log("begin post to posts");
            
                this.db5.collection('posts').doc(this.newID).set({
                    picture: this.picture,
                    title: this.title,
                    description: this.description,
                    user: "hardcoded for now",
                    time: new Date(),
                    upvotes: 1,
                    downvotes: 0,
                    comments: [],
                    id: this.newID,
                    sub: subredditID,
                    num: this.totalPosts
                })
                .then(function() {
                    console.log("post successfully written!");
                    //return;
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            
            
            
            //link the post to the subreddit (write the string in the array)
                console.log("begin post to subreddit");
            
                
                
            
                //now update array of posts in the subreddit
                 this.db5.collection('subreddits').doc(subredditID).update({
                            posts: this.postsArrForSub 
                })
                .then(function() {
                        console.log("post successfully linked to subreddit!");
                        //this.reloadPage();
                 })
                .catch(function(error) {
                        console.error("Error writing document: ", error);
                });
      
      /*
      
      //get latest post id, then increment by 1
      console.log("start search");
      console.log(this.totalPosts);
      console.log(this.postsArrForSub);
      
        //console.log("tst" + this.db5.collection('subreddits').aww;
        var newID;
        this.db5.collection('posts').valueChanges()
            .subscribe(res => {
                console.log(res);
                this.db5.collection('subreddits').valueChanges()
                    .subscribe(res2 => {
                        console.log(res2) //prints all subreddits
                        console.log(res);
                    
                    
                    
                        this.temp = res.length;
                        this.temp++;
                        console.log(this.temp);
                
                        newID = "p"+this.temp;
                    
                    });
                console.log(res);
                //this.temp3 = res;
            
                //this.temp = res;
                //delay 300ms
                //this.sleep(1000);//be safe, 1 second pause for now
                //this.temp2 = res;
                //console.log(this.temp2);//all posts
                
                //get new total number of posts and create id
              */  
            
            /*
            
            //------------------------------- next part, can finish in either order
                //add new post to posts collection
                console.log("begin post to posts");
            
                this.db5.collection('posts').doc(newID).set({
                    picture: this.picture,
                    title: this.title,
                    description: this.description,
                    user: "hardcoded for now",
                    time: new Date(),
                    upvotes: 1,
                    downvotes: 0,
                    comments: [],
                    id: newID
                })
                .then(function() {
                    console.log("post successfully written!");
                    //return;
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            
            
            
                //link the post to the subreddit (write the string in the array)
                console.log("begin post to subreddit");
            
                var url = window.location.href;
                var subredditID = url.replace(/^https?:\/\//, '').split('/')[1];
                //get the array of posts
                this.db5.collection('subreddits').doc(subredditID).valueChanges()
                    .subscribe(res => {
                        //get the current data
                        var array = res.posts;
                        array.push(newID);
                    
                        this.sleep(1000);
                    
                        //now update array
                        this.db5.collection('subreddits').doc(newID).update({
                            posts: array 
                        })
                        .then(function() {
                            console.log("post successfully linked to subreddit!");
                            this.reloadPage();
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    });
            
                //console.log(this.temp);*/
            //});
      
        
    }
    
    insertNewPost(res){
        
        
        
        //sort first
        /*
                var temp = 0;
                console.log(res);
                for(let post of res){
                    var num = +post.id.substring(1);
                    if(num > temp){
                        temp = num;
                    } else{
                    
                    }
                }
            *//*
        this.temp = res.length;
        this.temp++;
        console.log(this.temp);
        */
        /*
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
        
        //get the array of posts
        this.dbc.collection('subreddits').doc(subredditID).valueChanges()
            .subscribe(res => {
                var array = res.posts;
                array.push("p"+temp);
                //now update array
                this.dbc.collection('subreddits').doc(subredditID).update({
                    posts: array 
                })
                .then(function() {
                    console.log("post successfully linked to subreddit!");
                    this.reloadPage();
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        });
        */
    }
}