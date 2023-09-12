import { Component } from '@angular/core';
import { Projetos } from '../../shared/models/projetos';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent {

  projetos: Projetos[] = [];

  colunasTabela: string[] = [
    'Nome',
    'Descrição',
    'Data de Início',
    'Data de Término',
    'Status',
  ];
  camposEntidade: string[] = [
    'nome',
    'descricao',
    'dataInicio',
    'dataFim',
    'status',
  ];

  editarItem(item: any) {

  }

  excluirItem(item: any) {

  }
}
