import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.css']
})
export class DialogoConfirmacaoComponent {
  @Input() titulo!: String;
  @Input() mensagem!: String;
  @Input() isActive: boolean = false;
  @Input() onConfirm!: () => void;
  @Input() onCancel!: () => void;
}
