import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.sortPosts().subscribe(posts => {
      // console.log(posts);
      this.posts = posts;
    });
  }

}
