import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.css']
})
export class HomePostsComponent implements OnInit {

  result = new Array(); 
  totalPosts = 0;
    
  constructor(db: AngularFirestore) { 
      //get the 10 highest ID posts
      //      db.collection('posts', 'items', ref => ref.where('size', '==', 'large')).valueChanges()
      db.collection('posts', ref => ref.orderBy('time').limit(10)).valueChanges()
        .subscribe(res => {
            //console.log(res);
            this.result = res;
      });
  }

  ngOnInit() {
  }


    //need to pull 10 most recent posts from firebase and display
    
    //make them into a posts array
    
    //ng for, put into posts
    
    votes = 0;
    
    
    number = 10;
    
    score = this.votes;


}
