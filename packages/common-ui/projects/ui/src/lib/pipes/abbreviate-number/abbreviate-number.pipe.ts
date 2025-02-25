import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'ytdAbbreviateNumber',
})
export class AbbreviateNumberPipe implements PipeTransform {
  public transform(value: number | string, digits = 0): string | undefined {
    if (!value) {
      return;
    }

    if (typeof value !== 'number') {
      return;
    }

    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
      .slice()
      .reverse()
      .find((lookupitem) => {
        return value >= lookupitem.value;
      });
    return item ? (value / item.value)?.toFixed(digits)?.replace(rx, '$1') + item.symbol : '0';
  }
}
