import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isExpanded!: boolean;
  @Output() closeMenuClick = new EventEmitter<boolean>();

  onCloseClick(val: boolean){
    this.closeMenuClick.emit(val);
  }
}
