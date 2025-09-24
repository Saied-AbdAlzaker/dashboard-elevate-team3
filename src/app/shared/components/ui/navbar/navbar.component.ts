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


  private readonly breadcrumbSignal: BreadcrumbValuesService = inject(BreadcrumbValuesService);

  constructor(private breadcrumbService: BreadcrumbValuesService) {
    effect(() => {
      this.items = this.breadcrumbService.BreadcrumbSignal();
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // If The User Clicked Outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isOpen = false;
    }
  }


}
