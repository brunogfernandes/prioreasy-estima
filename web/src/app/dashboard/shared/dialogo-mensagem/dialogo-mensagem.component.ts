import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialogo-mensagem',
  templateUrl: './dialogo-mensagem.component.html',
  styleUrls: ['./dialogo-mensagem.component.css']
})
export class DialogoMensagemComponent {
  @Input() titulo!: String;
  @Input() mensagem!: String;
  @Input() isActive: boolean = false;
  @Input() onConfirm!: () => void;
}
