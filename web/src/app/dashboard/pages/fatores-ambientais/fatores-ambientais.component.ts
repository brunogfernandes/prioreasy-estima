import { Component } from '@angular/core';
import { FatAmbProService } from '../../services/fatAmbPro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fatAmbPro } from '../../shared/models/fatAmbPro';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto';

@Component({
  selector: 'app-fatores-ambientais',
  templateUrl: './fatores-ambientais.component.html',
  styleUrls: ['./fatores-ambientais.component.css']
})
export class FatoresAmbientaisComponent {

  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private fatAmbService: FatAmbProService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }


  // datasource
  fat: fatAmbPro  [] = [];

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
  tituloDialogo: string = "Deseja realmente excluir este Fator Ambiente?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do Fator Ambiente em questão serão excluídos do sistema.";

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

    this.fatAmbService.list(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());

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
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-fator-ambiental']);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  editarItem(item: any) {
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'editar-fator-ambiental', item.id]);
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.fatAmbService.delete(this.itemExclusao).subscribe(() => {
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
