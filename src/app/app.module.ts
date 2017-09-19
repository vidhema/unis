import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { CollapseDirective } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './components/footer/footer.component';

import { FirebaseService } from './services/firebase.service';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { AuthGuard } from './auth.guard';
import { SortpipePipe } from './sortpipe.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';

export const firebaseConfig = {
    apiKey: 'AIzaSyC8jtkqYYPgWu71Uhc60iE4lBs-ywPKr9U',
    authDomain: 'unis-fin.firebaseapp.com',
    databaseURL: 'https://unis-fin.firebaseio.com',
    storageBucket: 'unis-fin.appspot.com',
    messagingSenderId: '892794733107'
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: EditPostComponent, canActivate: [AuthGuard]},
  { path: 'add-report', component: AddReportComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  { path: 'report/:id', component: ReportComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsComponent},
  { path: 'vijesti/:id', component: DetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    NavbarComponent,
    PostComponent,
    AddPostComponent,
    EditPostComponent,
    ReportsComponent,
    AddReportComponent,
    ReportComponent,
    LoginComponent,
    CollapseDirective,
    NewsComponent,
    SortpipePipe,
    DetailsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig), // firebaseAuthConfig
    FlashMessagesModule,
    CarouselModule.forRoot(),
    Ng2OrderModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [FirebaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
