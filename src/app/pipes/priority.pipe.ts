import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let priority = (value == 1) ? 'Instabuy' : 'Remate';
    return priority;
  }

}
