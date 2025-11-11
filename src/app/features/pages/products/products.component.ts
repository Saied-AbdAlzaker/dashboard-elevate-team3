import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DeleteDialogComponent } from '../../../shared/components/ui/delete-dialog/delete-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/interfaces/products/products';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-products',
  imports: [TableModule, RouterLink, ButtonModule, SearchPipe, FormsModule,
    CurrencyPipe, ButtonModule, BadgeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [DialogService, MessageService]
})
export class ProductsComponent implements OnInit {

  productsList: Product[] = [];
  value: string = '';
  searchTitle: string = '';
  ref: DynamicDialogRef | undefined;
  subscription: Subscription = new Subscription;

  constructor(private _productsService: ProductsService, private _dialogService: DialogService,
    private cd: ChangeDetectorRef, private messageService: MessageService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.subscription = this._productsService.allProducts().subscribe({
      next: (res) => {
        this.productsList = res.products;
        this.cd.markForCheck();
      }
    });
  }

  stockSeverity(product: Product) {
    if (product.quantity < 0) return 'danger';
    else if (product.quantity > 0 && product.quantity < 10) return 'warn';
    else return 'success';
  }

  // delete-dialog
  showDeleteDialog(product: Product) {
    const ref = this._dialogService.open(DeleteDialogComponent, {
      header: '',
      width: '40vw',
      maximizable: true,
      closable: true,
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: { products: product },
    });

    ref.onClose.subscribe(success => {
      if (success) {
        this.deleteProduct(product._id)
      }
    });
  }

  deleteProduct(id: string) {
    this._productsService.deleteProduct(id).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully', life: 1000 });
        this.ref?.close(true);
        this.getAllProducts();
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 1000 });
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
