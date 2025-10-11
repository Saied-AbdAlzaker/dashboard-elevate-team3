import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-delete-dialog',
  imports: [ToastModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  providers: [MessageService, DialogService]
})
export class DeleteDialogComponent implements OnInit {

  productId!: string;

  constructor(private _productsService: ProductsService, private messageService: MessageService,
    private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    const products: any = this.config.data.products;
    this.productId = products._id;
  }

  deleteProduct(id: string) {
    this._productsService.deleteProduct(id).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully', life: 1000 });
        this.ref.close(true);
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 1000 });
      }
    })
  }

  closeDialog() {
    this.ref.close(true);
  }

}
