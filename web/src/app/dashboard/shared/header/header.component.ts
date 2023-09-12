import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() sidebarExpanded!: boolean;
  @Output() menuClick = new EventEmitter<boolean>();

  onMenuClick(val: boolean){
    this.menuClick.emit(val);
  }
}
