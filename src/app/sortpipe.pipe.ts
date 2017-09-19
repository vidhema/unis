import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Pipe({
  name: 'sortpipe'
})
export class SortpipePipe implements PipeTransform {

  transform(n: any) {
    n.sort((a, b) => {
          if (a.datetime > b.datetime) {
            return -1;
          } else if (a.datetime < b.datetime) {
            return 1;
          } else {
            return 0;
          }
        });
        return n;
  }
}
