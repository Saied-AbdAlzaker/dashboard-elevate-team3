import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../shared/services/products/products.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ValidationProductComponent } from "../../../shared/components/ui/validation-product/validation-product.component";
import { Product } from '../../../shared/interfaces/products/products';
import { Category } from '../../../shared/interfaces/ctegories/categories';
import { Occasion } from '../../../shared/interfaces/occasions/occasions';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Image } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-add-edit-product',
  imports: [FormsModule, InputTextModule, TextareaModule, DropdownModule, Dialog, Image, CarouselModule,
    InputNumber, ReactiveFormsModule, ToastModule, FileUpload, ValidationProductComponent, ButtonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
  providers: [MessageService]
})
export class AddEditProductComponent implements OnInit, OnDestroy {

  productId: string = '';
  product: Product = {} as Product;
  productsList: Product[] = [];
  categoryList: Category[] = [];
  occasionsList: Occasion[] = [];
  subscriptionProducts: Subscription = new Subscription;
  subscriptionCategories: Subscription = new Subscription;
  subscriptionOccasions: Subscription = new Subscription;
  coverFile!: File;
  imagesFile: File[] = [];
  // dialog
  visible: boolean = false;
  visibleImages: boolean = false;
  imageDialog: string = '';
  galleryDialog: string[] = [];

  responsiveOptions: any[] | undefined;

  private _productsService = inject(ProductsService);
  private messageService = inject(MessageService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  constructor() {
    this.productId = this._activatedRoute.snapshot.params['id'];

    if (this.productId) {
      this._productsService.getSpecificProduct(this.productId).subscribe({
        next: (res) => {
          this.product = res?.product;
          this.imageDialog = this.product.imgCover;
          this.galleryDialog = this.product.images;

          this.productsForm.patchValue({
            title: res.product.title,
            description: res.product.description,
            price: res.product.price,
            discount: res.product.discount,
            priceAfterDiscount: res.product.priceAfterDiscount,
            quantity: res.product.quantity,
            category: res.product.category,
            occasion: res.product.occasion,
          })
        }
      })
    }
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllOccasions();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]

  }

  getAllProducts() {
    this.subscriptionProducts = this._productsService.allProducts().subscribe({
      next: (res) => {
        this.productsList = res.products;
      }
    });
  }
  getAllCategories() {
    this.subscriptionCategories = this._productsService.allCategories().subscribe({
      next: (res) => {
        this.categoryList = res.categories;
      }
    });
  }
  getAllOccasions() {
    this.subscriptionOccasions = this._productsService.allOccasions().subscribe({
      next: (res) => {
        this.occasionsList = res.occasions;
      }
    });
  }

  productsForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    quantity: new FormControl(null, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    discount: new FormControl(0),
    priceAfterDiscount: new FormControl(0),
    category: new FormControl('', [Validators.required]),
    occasion: new FormControl('', [Validators.required]),
    imgCover: new FormControl<File | null>(null),
    images: new FormControl<File[]>([]),
  })

  submitForm(data: FormGroup) {
    let myData = new FormData();
    myData.append('title', data?.value?.title);
    myData.append('description', data.value.description);
    myData.append('quantity', data.value.quantity);
    myData.append('price', data.value.price);
    myData.append('category', data.value.category);

    if (!this.productId) {
      myData.append('discount', data.value.discount);
      myData.append('occasion', data.value.occasion);
    }

    if (this.coverFile) {
      myData.append('imgCover', this.coverFile);
    }

    if (this.imagesFile?.length > 0) {
      this.imagesFile.forEach((file) => {
        myData.append('images', file);
      });
    }

    // if (this.productsForm.invalid) {
    //   this.productsForm.markAllAsTouched();
    //   return;
    // }

    if (this.productId) {
      this._productsService.updateProduct(this.productId, myData).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully', life: 3000, sticky: true });
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product!', life: 3000, sticky: true });
        }, complete: () => {
          this._router.navigate(['products']);
        }
      });
    } else {
      this._productsService.addProduct(myData).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully', life: 3000, sticky: true });
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product!', life: 3000, sticky: true });
        }, complete: () => {
          this._router.navigate(['products']);
        }
      });
    }
  }

  onCoverSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.coverFile = event.files[0];
      this.productsForm.patchValue({ imgCover: this.coverFile });
    }
  }

  onGallerySelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.imagesFile = [...event.files];
      this.productsForm.patchValue({ images: this.imagesFile });
    }
  }

  calculateDiscountedPrice() {
    const price = this.productsForm.get('price')?.value || 0;
    const discount = this.productsForm.get('discount')?.value || 0;
    this.productsForm.get('priceAfterDiscount')?.setValue(price - (price * discount) / 100);
  }

  showImgCover() {
    this.visible = true;
  }

  showImages() {
    this.visibleImages = true;
  }

  ngOnDestroy(): void {
    this.subscriptionProducts.unsubscribe();
    this.subscriptionCategories.unsubscribe();
    this.subscriptionOccasions.unsubscribe();
  }

}
