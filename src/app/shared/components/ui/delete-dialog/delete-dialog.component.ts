import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  
   @Output() deleteConfirmed = new EventEmitter<string>();

  productId!: string;

  constructor(private _productsService: ProductsService, private messageService: MessageService,
    private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    const products: any = this.config.data.products;
    this.productId = products._id;
  }

  deleteProduct() {
    this.deleteConfirmed.emit(this.productId);
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close(true);
  }

}
