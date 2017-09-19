import { Component, OnInit, Input, Inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  post: any;
  id: any;
  image: any;
  nn: any;
  niz;

  constructor(
    private firebaseService: FirebaseService,
    // private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.niz = [];

    this.firebaseService.sortPosts().subscribe(post => {
      this.post = post;
      for (var i = 0; i < this.post.length; i++) {
          const storageRef = firebase.storage().ref();
          let spaceRef = storageRef.child(post[i].path[0]);
          let d = {
              title: this.post[i].title,
              body: this.post[i].body,
              datetime: this.post[i].datetime,
              key: post[i].$key,
              url: this.nn
          };
          storageRef.child(post[i].path[0]).getDownloadURL().then((url) => {
            d.url = url;
            this.niz.push(d);
            this.niz.sort(function(a, b){
              return b.datetime - a.datetime;
            });
          });
      }
      // console.log(this.niz);
    });
  }
}
