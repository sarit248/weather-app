import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Math.floor(<number>value);
  }
}
