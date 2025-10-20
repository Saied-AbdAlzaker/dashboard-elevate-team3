import {Component, HostListener} from '@angular/core';
import {LogoComponent} from '../logo/logo.component';
import {RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    LogoComponent,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isOpen: boolean = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // If The User Clicked Outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.relative')) {
      this.isOpen = false;
    }
  }

}
