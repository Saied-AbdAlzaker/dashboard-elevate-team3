import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CategoriesService } from './service/categories.service';
import { Categories } from './interface/categories';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';

// import { Menu } from 'primeng/menu';
// import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-categories',
  imports: [TableModule, FormsModule, CommonModule,  RouterModule,Toast],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit{
  textSearch:string=''
  categories!:Categories []
  actionShow:boolean =false
  id:string = ''
  items: MenuItem[] | undefined;

  constructor(private _categoriesService:CategoriesService,private messageService: MessageService){

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

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res.categories

      },error:(err)=>{
        console.log(err);

      }
    })
  }

  deleteCategory(id:string){
    this._categoriesService.deleteCategory(id).subscribe({
      next:(res)=>{
        console.log(res);
          this.messageService.add({ severity: 'info', summary: 'Info', detail: res.message });

      },error:(err)=> {
        console.log(err);
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });

      },
    })
  }
  searchInput(){
    console.log(this.textSearch);

  }
  showMenu(id:string) {
    this.id = id;
    this.actionShow = true;
  }
}
