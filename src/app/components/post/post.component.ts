import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: any;
  post: any;
  imageUrls: ImageUrl[] = [];
  // images: any;
  count: any;
  path: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    // public af: AngularFire,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.imageUrls = [];

    this.firebaseService.getPostDetails(this.id).subscribe(post => {
      this.post = post;
      var slike = this.post.path;
      for (var i = 0; i < slike.length; i++) {
        const storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(slike[i]);
        storageRef.child(slike[i]).getDownloadURL().then((url) => {
          this.imageUrls.push(new ImageUrl(post.$key, url));

        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }

  onDeletePost() {
    this.firebaseService.deletePost(this.id);
    this.router.navigate(['/posts']);
  }
}

export class ImageUrl {
  url: string;
  id: string;
  constructor(_id: string, _url: string) {
    this.url = _url;
    this.id = _id;
  }
}
