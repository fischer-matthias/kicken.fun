import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soccerTime'
})
export class TimePipe implements PipeTransform {

  transform(value: number, args?: any): any {

    let strMin: string = '00';
    let strSec: string = '00';

    if(value != 0) {
      let min = Math.floor(value/60);
      let sec = value % 60;
  
      if(min < 10) {
        strMin = '0' + min;
      } else {
        strMin = min + '';
      }
  
      if(sec < 10) {
        strSec = '0' + sec;
      } else {
        strSec = sec + '';
      }
    }


    return strMin + ':' + strSec;
  }

}
