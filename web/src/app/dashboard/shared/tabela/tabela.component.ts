import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent {
  @Input() data!: any[];
  @Input() entityAttributes!: string[];
  @Input() columns!: string[];
  @Input() hasView!: boolean;
  @Input() hasEdit: boolean = true;
  @Input() hasDelete: boolean = true;
  @Input() onEdit!: (item: any) => void;
  @Input() onDelete!: (item: any) => void;
  @Input() onView!: (item: any) => void;
}
