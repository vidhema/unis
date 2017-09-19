import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';


@Injectable()
export class FirebaseService {

  posts: FirebaseListObservable<any[]>;
  post: FirebaseObjectObservable<any>;
  image: FirebaseObjectObservable<any[]>;
  images: FirebaseListObservable<any[]>;
  myimages: any;
  folderImage: any;

  reports: FirebaseListObservable<any[]>;
  report: FirebaseObjectObservable<any>;
  folderReport: any;
  // n: Post[];

  constructor(private af: AngularFire, private http: Http) {
    this.folderImage = 'images';
    this.folderReport = 'reports';
    this.posts = this.af.database.list('/posts') as FirebaseListObservable<Post[]>;
    this.images = this.af.database.list('/images') as FirebaseListObservable<Post[]>;
    this.reports = this.af.database.list('/reports') as FirebaseListObservable<Report[]>;
  }

  sortPosts() { // show last 5
    return this.af.database
      .list('/posts') // .list
      .map(items => items.sort((a, b) => b.datetime - a.datetime)) as FirebaseListObservable<Post[]>;
  }

  // get first post
  getFirst() {
    return this.af.database
      .list('/posts', {
        query: {
          limitToLast: 1,
        }
      }) as FirebaseListObservable<Post[]>;
  }

  getPosts() {
    /*this.posts = this.af.database.list('/posts') as FirebaseListObservable<Post[]>;
    return this.posts;*/
    return this.posts.map(items => items.sort((a, b) => b.datetime - a.datetime)) as FirebaseObjectObservable<Post>;
  }

  getPostDetails(id) {
    this.post = this.af.database.object('/posts/' + id) as FirebaseObjectObservable<Post>;
    return this.post;
  }

  getReports() {
    return this.reports;
  }

  getReport(id) {
    this.report = this.af.database.object('/reports' + id) as FirebaseObjectObservable<Report>;
    return this.report;
  }

  updatePost(id, p) {
    return this.posts.update(id, p);
  }

  deletePost(id) {
    return this.posts.remove(id);
  }

  getPostImages(id: any): Observable<Image[]> {
    return this.af.database.list('images')
      .map(_images => _images.filter(image => image.propid === id));
  }

  addReport(report) {
    const storageRef = firebase.storage().ref();
    let files = [(<HTMLInputElement>document.getElementById('report')).files[0]];
    for (var selectedFile of files) {
      let path = `/${this.folderReport}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        // report.title = selectedFile.name;
        report.path = path;
        return this.reports.push(report);
      });
    }
  }

  addPost(post) {
    var n = [];
    let files = [(<HTMLInputElement>document.getElementById('image')).files];
    // let propRef = this.posts.push(post);
    let iRef;
    let selectedFile;
    let path;
    for (var i = 0; i < files[0].length; i++) {
      const storageRef = firebase.storage().ref();
      let random = Math.floor(Math.random() * 500) + 1;
      selectedFile = files[0][i];
      path = `/${this.folderImage}/${random}${selectedFile.name}`;
      n.push(path);
      iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
      });
    }
    post.path = n;
    return this.posts.push(post);
  }
  /*
  iRef.put(selectedFile).then((snapshot) => {
      // post.name = selectedFile.name;
      post.path = n;
      return this.posts.push(post);
    });*/
  /*addPost(post) {
    const storageRef = firebase.storage().ref();
    let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let propRef = this.posts.push(post);
    for (var i = 0; i < files[0].length; i++) {
      let random = Math.floor(Math.random() * 500) + 1;
      let selectedFile = files[0][i];
      let path = `/${this.folderImage}/${random}${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        let image = {
          name: selectedFile.name,
          path: path,
          propid: propRef.key
        };
        return this.images.push(image);
      });
    }
  }*/

}

interface Post {
  $key?: String;
  title?: String;
  body?: String;
  image?: String;
  id?: Number;
  datetime?: Date;
  path?: string;
}
interface Image {
  $key?: string;
  name?: string;
  path?: string;
}
interface Report {
  $key?: String;
  title?: String;
  period?: Date;
}
