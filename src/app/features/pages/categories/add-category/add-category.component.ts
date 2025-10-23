import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  imports: [ɵInternalFormsSharedModule,ReactiveFormsModule,Toast,ButtonComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  providers: [MessageService]

})
export class AddCategoryComponent implements OnInit{
  selectedFileName:string=''
  categoryForm: FormGroup;

  categoryId: string | null = null;

  buttonStatus:boolean=false

  /* Valuable for  Subscription*/
  loadCategorySubscription!: Subscription;
  addCategorySubscription!: Subscription;
  editCategorySubscription!: Subscription;

  constructor(  private _categoriesService:CategoriesService,
                private fb:FormBuilder,
                private _activatedRoute: ActivatedRoute,
                private messageService: MessageService){
    this.categoryForm = this.fb.group({
      name:['',Validators.required],
      image:[null,Validators.required]
    })


  }
  ngOnInit(): void {
    this.getDateOfCategory();
  }
  /* Load Data For Edit Category */
  getDateOfCategory(){
    this.categoryId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.categoryId);
    if(this.categoryId ) {
      this.buttonStatus=true
      this.loadCategorySubscription = this._categoriesService.getCategory(this.categoryId).subscribe({
        next:(res)=>{
          console.log(res);
          this.categoryForm.get('name')?.setValue(res.category.name)
          this.selectedFileName = res.category.image

        },error:(err)=>{
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });

        }

      })
    }
  }

  /* Add Category Or Edit Category */
  AddCategory() {
    if(!this.categoryId) {
      /* Add Category */
      if(this.categoryForm.valid) {
        const formData = new FormData();
        formData.append('name', this.categoryForm.get('name')?.value);
        formData.append('image',this.categoryForm.get('image')?.value);
        this.addCategorySubscription = this._categoriesService.addCategories(formData).subscribe({
          next:(res)=> {
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${res.message} added ${res.category.name}`  });
            this.categoryForm.reset()
          },
          error:(err) => {
            console.log(err);

            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
          }
        })

    }
    } else {
      /* Edit Category */
      if(this.categoryForm.valid) {
        const formData = new FormData();
        formData.append('name', this.categoryForm.get('name')?.value);
        formData.append('image',this.categoryForm.get('image')?.value);
        this.editCategorySubscription = this._categoriesService.updateCategory(this.categoryId,formData).subscribe({
           next:(res)=> {
            console.log(res);
           this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          },
            error:(err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
          }

        })
      }
    }
  }

  /* Select Image */
  onImageSelected(event:Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if(file) {
      this.selectedFileName = file.name;

      this.categoryForm.patchValue({image: file});
      this.categoryForm.get('image')?.updateValueAndValidity();
    }
  }


  ngOnDestroy(): void {
    if(this.loadCategorySubscription){
      this.loadCategorySubscription.unsubscribe();
    }
    if(this.addCategorySubscription){
      this.addCategorySubscription.unsubscribe();
    }
    if(this.editCategorySubscription){
      this.editCategorySubscription.unsubscribe();
    }
  }
}
