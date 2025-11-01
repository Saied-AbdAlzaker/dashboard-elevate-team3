import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CategoriesService } from './service/categories.service';
import { Categories } from './interface/categories';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FilterCategoryPipe } from './pipe/filter-category.pipe';
import { Subscription } from 'rxjs';

// import { Menu } from 'primeng/menu';
// import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-categories',
  imports: [TableModule, FormsModule, CommonModule,  RouterModule,Toast, ConfirmDialog,ConfirmDialogModule,FilterCategoryPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class CategoriesComponent implements OnInit ,OnDestroy{
  textSearch:string=''
  categories!:Categories []
  actionShow:boolean =false
  categoryId:string = ''
  items: MenuItem[] | undefined;


  /* Valuable for  Subscription*/
  categoriesSubscription!: Subscription;
  deleteCategorySubscription!: Subscription;
  constructor(
    private _categoriesService:CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){

  }
  ngOnInit(): void {
    this.getCategories();
    this.items = [
            {
                label: 'Action',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-solid fa-pencil'
                    },
                    {
                        label: 'Delete',
                        icon: 'fa-regular fa-trash-can'
                    }
                ]
            }
        ];
  }
  /* Start Get All Categories */
  getCategories() {
    this.categoriesSubscription = this._categoriesService.getCategories().subscribe({
      next:(res)=>{

        this.categories = res.categories

      },error:(err)=>{
        console.log(err);

      }
    })
  }
  /* End Get All Categories */

  /*Start Delete Category   */
  deleteCategory(event: Event,id:string){
    debugger
    this.confirmationService.confirm({
       target: event.target as EventTarget,
            message: 'Do you want to delete this Category?',
            header: 'Delete Category',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
                this.deleteCategorySubscription = this._categoriesService.deleteCategory(id).subscribe({
                  next:(res)=>{
                      this.messageService.add({ severity: 'info', summary: 'Info', detail: res.message });

                  },error:(err)=> {
                    console.log(err);
                              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });

                  },
                })
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });

  }
  /*End Delete Category   */

  showMenu(id:string) {
    this.categoryId = id;
    this.actionShow = true;
  }


  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
    if(this.deleteCategorySubscription){
      this.deleteCategorySubscription.unsubscribe();
    }
  }
}
