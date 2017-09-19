import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Router } from '@angular/router';
// import { CollapseDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor(
    private router: Router,
    public af: AngularFire,
    public flashMassage: FlashMessagesModule
  ) { }

  logout() {
    this.af.auth.logout();
    // console.log('logged out');
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
