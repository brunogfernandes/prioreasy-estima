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
  @Input() onEdit!: (item: any) => void;
  @Input() onDelete!: (item: any) => void;
}
