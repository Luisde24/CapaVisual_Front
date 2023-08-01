import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTimeFormat'
})
export class DataTimeFormatPipe extends DatePipe implements PipeTransform {

  override transform(value: any, arg: any): any {
    return super.transform(value, 'dd/MM/yyyy HH:mm');
  }

}
