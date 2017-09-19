import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  id;
  title;
  body;
  image;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getPostDetails(this.id).subscribe(post => {
      // console.log(post);
      this.title = post.title;
      this.body = post.body;
    });
  }

  onEditSubmit() {
    let post = {
      // id: this.id,
      title: this.title,
      body: this.body
    };

    this.firebaseService.updatePost(this.id, post);
    // console.log(post);
    // this.flashMessage.show('Post ' + this.title + ' was edited.' , {cssClass: 'alert-success', timeout: 6000});
    this.router.navigate(['/posts']);
  }

}
