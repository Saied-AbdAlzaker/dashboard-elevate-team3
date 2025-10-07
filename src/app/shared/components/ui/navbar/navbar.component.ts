import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import {NgOptimizedImage} from '@angular/common';
import {Component, effect, HostListener, inject} from '@angular/core';
import {BreadcrumbValuesService} from './Service/breadcrumb-values.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [Breadcrumb, NgOptimizedImage, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true
})
export class NavbarComponent {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  isOpen: boolean = false;


  private readonly breadcrumbValuesService: BreadcrumbValuesService = inject(BreadcrumbValuesService);

  constructor() {
    effect(() => {
      this.items = this.breadcrumbValuesService.BreadcrumbSignal();
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // If The User Clicked Outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }
}
