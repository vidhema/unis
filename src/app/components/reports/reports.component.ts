import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: any;

  constructor(
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    this.firebase.getReports().subscribe(reports => {
      this.reports = reports;
    });
  }

}
