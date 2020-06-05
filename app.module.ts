import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; 

import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HomePostsComponent } from './home-posts/home-posts.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeSideComponent } from './home-side/home-side.component';
import { SubredditComponent } from './subreddit/subreddit.component';
import { NewpostComponent } from './newpost/newpost.component';
import { ViewpostComponent } from './viewpost/viewpost.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {environment} from '../environments/environment';
import { HomepageComponent } from './homepage/homepage.component';
import { SubredditHeaderComponent } from './subreddit-header/subreddit-header.component';
import { SubredditSideComponent } from './subreddit-side/subreddit-side.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SubredditHolderComponent } from './subreddit-holder/subreddit-holder.component';
import { CreateSubredditComponent } from './create-subreddit/create-subreddit.component';

import { AuthService } from './auth.service';

const routes: Routes = [
  /*{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'aww', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }*/
    {path: '', component: HomepageComponent},
    {path: ':subreddit', component: SubredditHolderComponent},
    {path: ':subreddit/:id', component: ViewpostComponent},
    {path: 'subreddit/newpost', component: NewpostComponent},
    {path: 'test', component: NewpostComponent}
    //{path: 'aww', component: SubredditHolderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePostsComponent,
    HomeHeaderComponent,
    HomeSideComponent,
    SubredditComponent,
    NewpostComponent,
    ViewpostComponent,
    HomepageComponent,
    SubredditHeaderComponent,
    SubredditSideComponent,
    CreatePostComponent,
    SubredditHolderComponent,
    CreateSubredditComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
      AuthService,
      HomeSideComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
