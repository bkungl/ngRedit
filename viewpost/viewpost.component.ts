import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { HomeSideComponent } from '../home-side/home-side.component';
//import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

    //vars
    postID;
    subredditID;
    url;
    
    post;
    result; //subreddit and the individual post
    subreddit;//use for the styling
    
    //number of comments total (for ID)
    numComments;
    user;
    
    comments = new Array();
    loggedIn;
    
    dbc;
    
  constructor(db: AngularFirestore, public auth: HomeSideComponent) { 
      this.dbc = db;
      console.log(auth);
      //console.log(auth.afAuth);
      //console.log(auth.authState.auth.currentUser);
      if(auth.authenticated == false){
          this.user = "this should not have worked";
          this.loggedIn = false;
      }else{
          this.loggedIn = true;
          //this.loggenIn =auth.authenticated;
          //console.log(auth.authenticated());
          if(!(auth.afAuth.auth.currentUser.displayName == null)){
             this.user = auth.afAuth.auth.currentUser.displayName; 
          }
          else{
              //this.user = auth.afAuth.auth.currentUser.email.split('@')[0];
              this.user = "test";
          }
            
          
      }

      /*auth.authState.subscribe((auth) => {
              this.authState = auth;
            console.log(auth);
            console.log(auth.currentUser);
        });*/

      //pull the post from the database
    //id is in the url, extract
    //get url
    this.url = window.location.href;
      
    //just get the post part -- WORKS
    this.postID = this.url.replace(/^https?:\/\//, '').split('/')[2];
      
      //get the subreddit part
    this.subredditID = this.url.replace(/^https?:\/\//, '').split('/')[1];
      
    //db lookup for extracted url
      
       db.collection('subreddits').doc(this.subredditID).valueChanges()
            .subscribe(res1 => {
                //console.log(res);
                        
                //for use in subreddit styling
                this.subreddit = res1;
               // console.log(res1);//works
            
                 
           
                //now, we get the post
                db.collection('posts').doc(this.postID).valueChanges()
                    .subscribe(res2 => {
                        //populate post data into the array
                        this.post = res2;
                        //console.log(res2);
                        //console.log(res);
                        //this.score = res.upvotes - res.downvotes;//idk if this works
                        
                        //now, get the comments on the post
                        for (var item of res2.comments) {//this error is ok.
                            db.collection('comments').doc(item).valueChanges()
                                .subscribe(res3 => {
                                    //populate post data into the array
                                    //this.comments = res3;
                                    //console.log(res3);
                                
                                    //populate post data into the array
                                    this.comments.push(res3);
                                    //console.log(res3);
                                    
                                    //this.score = res.upvotes - res.downvotes;//idk if this works
                                    //console.log(res);
                                    //this.score = res.upvotes - res.downvotes;//idk if this works
                                });
                        }
                    });
            });
      
        db.collection('comments').valueChanges()
            .subscribe(res => {
                this.numComments = res.length;
        });    
            
      
    //use the info to populate the page
  }

  ngOnInit() {
  }
    
    
    //post action to database when page is done
    ngOnDestory(){
        console.log("destorying");
        this.dbc.collection('posts').doc(this.post.id).update({
            upvotes: this.post.upvotes,
            downvotes: this.post.downvotes
        });
        
    }

  upVoteComment(i){
      this.comments[i][6]++;
  }
  downVoteComment(i){
      this.comments[i][1]--;
  }
  
alreadyEditedUp = false;
    alreadyEditedDown = false;
    
    upVotePost(index: number) {
        //conditions:
        //if hasnt been upvote yet and not downvoted and pressed upvote, upvote
        //if has been upvoted and press upvote, remove upvote
        //if hasnt been upvoted yet downvotes and press upvote, remove downvote
        //if has been upvoted and is downvotes already -- this shouldnt happen
        
        if(!this.alreadyEditedUp && !this.alreadyEditedDown){
            this.post.upvotes++;
            this.alreadyEditedUp = true;
        }
        else if(this.alreadyEditedUp){
            this.post.upvotes--;
            this.alreadyEditedUp = false;
        }
        else if(this.alreadyEditedDown){
            this.post.downvotes--;
            this.alreadyEditedDown = false;
        }
        
    }


    downVotePost(index: number) {
        //if havent downvotes and havent upvoted, add a downvote
        if(!this.alreadyEditedDown && !this.alreadyEditedUp){
            this.post.downvotes++;
            this.alreadyEditedDown = true;
        }
        //if have already downvoted, take away a downvote
        else if(this.alreadyEditedDown){
            this.post.downvotes--;
            this.alreadyEditedDown = false;    
        }
        //if we voted up and are hitting down, take an up away
        else if(this.alreadyEditedDown){
            this.post.upvotes++;
            this.alreadyEditedUp = false;
        }
    }    
    
    
    tempComments;
    newComment;
    strID;
    lastNum;
    commentInput;
    commentsArr;
    //dbc: AngularFirestore;
    submitNewComment(){
        //if not logged in, alert
        if(this.loggedIn == false){
            alert("You must be logged in");
        }
        else{
        
        //get how many comments there are
        //this is done in constructor    
        
        //add 1
        this.numComments++;
        
        //post comment to firebase
        // Add a new document in collection "cities"
        this.dbc.collection('comments').doc("c"+this.numComments).set({
            id: "c"+this.numComments,
            upvotes: 1,
            downvotes: 0,
            //poster: this.auth.currentUser,
            //poster: this.user,
            poster: "A Kungl",
            time: new Date(),
            responses: [],
            comment: this.commentInput
        })
        .then(function() {
            console.log("comment successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
        
        //then we have to link the comment to the post
        //get the current comments of the array on the post
        this.commentsArr = this.post.comments;
        //console.log(this.commentsArr);
        //console.log(this.post);
        //then add the new comment
        this.commentsArr.push("c"+this.numComments);
        //console.log("now setting");
        
        this.dbc.collection('posts').doc("p1").update({
            comments: this.commentsArr
            
        }).then(function() {
            console.log("comment successfully linked!");
            //this.reloadPage();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        }
        
        
    }
    
   reloadPage(){
       location.reload();
   } 
    
}
