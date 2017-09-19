import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
// import * as firebase from 'firebase';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  id: any;
  report: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public af: AngularFire,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getReport(this.id).subscribe(report => {
      this.report = report;
    });
  }


}
