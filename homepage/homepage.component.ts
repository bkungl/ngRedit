import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    dbc;
    temp;
    
  constructor(db: AngularFirestore) {
    this.dbc = db;  
  }

  ngOnInit() {
  }
    
    creatingNew = true;//means we orignially arent, i know its weird
    
    toggleCreate(){
        if(this.creatingNew){
            this.creatingNew = false;
        }else{
            this.creatingNew = true;
        }
    }
    subredditInput;

    submitNew(){
        //post comment to firebase
        
        this.dbc.collection('subreddits').doc(this.subredditInput).valueChanges()
            .subscribe(res => {
                console.log(res);
                if(!(res == null)){
                    //it exists, do nothing
                    alert("This subreddit already exists");
                }
                else{
                    //else it doesnt exist, create it
                    //get the next id
                    this.dbc.collection('subreddits').valueChanges()
                        .subscribe(res => {
                            this.temp = res.length;
                            this.temp++;
                            console.log(this.temp);
                            
                            
                            //now create it
                            this.dbc.collection('subreddits').doc(this.subredditInput).set({
                                id: "s"+this.temp,
                                name: this.subredditInput,
                                posts: []
                            })
                            .then(function() {
                                console.log("subreddit successfully created!");
                                alert("Successfull created subreddit!");
                            })
                            .catch(function(error){
                                console.error("Error writing document: ", error);
                            })
                            res.unsubscribe();
                            alert("Your Subreddit has been created!");
                        })     
                }
            });
    }
}
    