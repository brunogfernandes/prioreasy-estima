import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  username!: string;

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    this.username = localStorage.getItem('usu_name')!;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usu_id');
    localStorage.removeItem('usu_name');
    localStorage.removeItem('usu_email');
    this.router.navigate(['/']);
  }
}
