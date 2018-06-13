import { Pipe, PipeTransform } from '@angular/core';
import { Time } from './models/time';

@Pipe({
  name: 'soccerTime'
})
export class TimePipe implements PipeTransform {

  transform(value: Time): any {

    let strMin = '00';
    let strSec = '00';

    if (value.timeInSeconds !== 0) {
      const min = Math.floor(value.timeInSeconds / 60);
      const sec = value.timeInSeconds % 60;

      if (!value.secondHalf && min >= 45) {
        strMin = '45';
        strSec = '00';

        const strMinDiff = (min - 45) + '';
        let strSecDiff: string;

        if (sec < 10) {
          strSecDiff = '0' + sec;
        } else {
          strSecDiff = sec + '';
        }

        return strMin + ':' + strSec + ' +' + strMinDiff + ':' + strSecDiff;
      } else if (value.secondHalf && min >= 90) {
        strMin = '90';
        strSec = '00';

        const strMinDiff = (min - 90) + '';
        let strSecDiff: string;

        if (sec < 10) {
          strSecDiff = '0' + sec;
        } else {
          strSecDiff = sec + '';
        }

        return strMin + ':' + strSec + ' +' + strMinDiff + ':' + strSecDiff;
      } else {

        if (min < 10) {
          strMin = '0' + min;
        } else {
          strMin = min + '';
        }

        if (sec < 10) {
          strSec = '0' + sec;
        } else {
          strSec = sec + '';
        }
      }

      return strMin + ':' + strSec;
    } else {
      return strMin + ':' + strSec;
    }
  }

}
