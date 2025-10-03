import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';

type StatColor = 'red' | 'blue' | 'violet' | 'emerald';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() value: string | number = '';
  @Input() label: string = '';
  @Input() currency?: string;
  @Input() color: StatColor = 'blue';
  @Input() icon: 'box' | 'orders' | 'categories' | 'revenue' = 'box';

  PrimeIcons = PrimeIcons;

  get iconClass(): string {
    const iconMap: Record<string, string> = {
      box: PrimeIcons.BOX,
      orders: PrimeIcons.SHOPPING_CART,
      categories: PrimeIcons.TAGS,
      revenue: PrimeIcons.DOLLAR,
    };
    return iconMap[this.icon] || PrimeIcons.BOX;
  }

  get bgClass(): string {
    const map: Record<StatColor, string> = {
      red: 'bg-red-50 ring-red-100',
      blue: 'bg-blue-50 ring-blue-100',
      violet: 'bg-violet-50 ring-violet-100',
      emerald: 'bg-emerald-50 ring-emerald-100',
    };
    return map[this.color];
  }

  get accentBgClass(): string {
    const map: Record<StatColor, string> = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      violet: 'bg-violet-100 text-violet-600',
      emerald: 'bg-emerald-100 text-emerald-600',
    };
    return map[this.color];
  }

  get valueClass(): string {
    const map: Record<StatColor, string> = {
      red: 'text-red-600',
      blue: 'text-blue-600',
      violet: 'text-violet-600',
      emerald: 'text-emerald-600',
    };
    return map[this.color];
  }
}


