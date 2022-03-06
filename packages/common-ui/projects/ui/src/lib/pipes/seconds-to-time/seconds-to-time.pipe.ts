import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime',
})
export class SecondsToTime implements PipeTransform {
  public transform(value: number | string): string | undefined {
    if (!value) {
      return;
    }
    const time = new Date(1000 * +value).toISOString().substr(11, 8);
    return time;
  }
}
