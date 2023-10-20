import { Component } from '@angular/core';
import { FatTecService } from '../../services/fatTec.service';
import { FatTecProService } from '../../services/fatTecPro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fatTec } from '../../shared/models/fatTec';
import { fatTecPro } from '../../shared/models/fatTecPro';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto'

@Component({
  selector: 'app-fatores-tecnicos',
  templateUrl: './fatores-tecnicos.component.html',
  styleUrls: ['./fatores-tecnicos.component.css']
})
export class FatoresTecnicosComponent {

  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private fatTecService: FatTecProService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }


  // datasource
  fat: fatTecPro  [] = [];

  // tabela
  colunasTabela: string[] = [
    'Descricao',
    'Peso',
    'Valor'
  ];

  camposEntidade: string[] = [
    'descricao',
    'peso',
    'valor'
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 8;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  // diálogo de confirmação
  showModal: boolean = false;
  itemExclusao!: number;
  tituloDialogo: string = "Deseja realmente excluir este Fator Tecnico?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do Fator Tecnico em questão serão excluídos do sistema.";

  ngOnInit(){
    this.buscarProjeto(this.projetoId, this.userId);
    this.executarBusca();
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }


  private executarBusca(): void {

    this.fatTecService.list(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());

  }

  private processarResultado() {
    return (data: any) => {
      this.fat = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  openNewFator(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-fator-tecnico']);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  editarItem(item: any) {
    console.log(item);
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'editar-fator-tecnico', item.id]);
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.fatTecService.delete(this.itemExclusao).subscribe(() => {
      this.showModal = false;
      this.executarBusca();
    });
  }

  prevPage() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.executarBusca();
    }
  }

  nextPage() {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.executarBusca();
    }
  }

}
