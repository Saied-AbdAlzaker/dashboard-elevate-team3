import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/products/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchValue: string): Product[] {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

}
