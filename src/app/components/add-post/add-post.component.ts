import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  title: any;
  body: string;
  images: any;
  id: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private af: AngularFire
  ) { }

  onAddSubmit() {
    const post = {
      title: this.title,
      body: this.body,
      datetime: Date.now()
    };
    this.firebaseService.addPost(post);
    this.router.navigate(['posts']);
  }
  /*onAddSubmit() {
    const post = {
      title: this.title,
      body: this.body,
      datetime: Date.now()
    };
    this.firebaseService.addPost(post);
    this.router.navigate(['posts']);
  }*/

  ngOnInit() {
  }

}
