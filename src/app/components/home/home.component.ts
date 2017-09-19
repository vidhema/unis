import { Component, OnInit, Directive, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { PostComponent } from '../post/post.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { SortpipePipe } from '../../sortpipe.pipe';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // pipes: [SortpipePipe]
})

export class HomeComponent implements OnInit {

  id: any;
  post: any;
  image: any;
  nn: any;
  niz;

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    public af: AngularFire,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    var location = { lat: 43.351473, lng: 17.805930 };
    var mapOptions = {
      zoom: 18,
      center: location,
      scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: 'assets/darkounis1.png'
    });

    this.id = this.route.snapshot.params['id'];
    this.niz = [];

    this.firebase.getFirst().subscribe(post => {
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
          /*this.niz.sort(function (a, b) {
            return b.datetime - a.datetime;
          });*/
        });
      }
    });

  }

}
