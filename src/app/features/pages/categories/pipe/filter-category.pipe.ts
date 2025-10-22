import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(value: any[],search:string): any[] {
    return value.filter(category => category.name.toLowerCase().includes(search.toLowerCase()));
  }

}
