import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent {
  @Input() isActive!: boolean;
  @Input() isExpanded: boolean = true;
  @Input() title!: string;
}
