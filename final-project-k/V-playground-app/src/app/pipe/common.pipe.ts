
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 'name': 'clip'})

export class clipPipe implements PipeTransform {
  transform(val: string) {
    if (val.length > 36){
      return val.slice(0, 36) + '...';
    } else {
      return val;
    }
  }
}
