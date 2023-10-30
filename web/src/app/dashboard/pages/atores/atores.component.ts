import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtorService } from '../../services/ator.service';
import { Atores } from '../../models/atores';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.component.html',
  styleUrls: ['./atores.component.css']
})
export class AtoresComponent {

  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private atoresService: AtorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }


  // datasource
  atores: Atores[] = [];

  // tabela
  colunasTabela: string[] = [
    'Nome',
    'Complexidade',
    'Descrição'
  ];

  camposEntidade: string[] = [
    'nome',
    'complexidade',
    'descricao',
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 5;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  // metrics
  totalAtores: number = 0;
  atoresSimples: number = 0;
  atoresMedios: number = 0;
  atoresComplexos: number = 0;

  // diálogo de confirmação
  showModal: boolean = false;
  itemExclusao!: number;
  tituloDialogo: string = "Deseja realmente excluir este ator?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do ator em questão serão excluídos do sistema.";

  ngOnInit(){
    this.buscarProjeto(this.projetoId, this.userId);
    this.executarBusca();
    this.buscarMetricas();
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  onSubmitSearch(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.executarBusca();
  }

  private executarBusca(): void {
    if(!this.filterValue){
      this.atoresService.list(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    } else {
      this.atoresService.listByName(this.projetoId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    }
  }

  private processarResultado() {
    return (data: any) => {
      this.atores = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  openNewAtor(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-atores']);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  editarItem(item: any) {
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'editar-atores', item.id]);
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.atoresService.delete(this.itemExclusao).subscribe(() => {
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

  private buscarMetricas(): void {

    this.atoresService
    .getNumberOfAtores(
      this.projetoId
    )
    .subscribe((data) => {
      this.totalAtores = data.totalCount;
    });

    this.atoresService
    .getNumberOfAtoresSimples(
      this.projetoId
    )
    .subscribe((data) => {
      this.atoresSimples = data.totalCount;
    });

    this.atoresService
    .getNumberOfAtoresMedios(
      this.projetoId
    )
    .subscribe((data) => {
      this.atoresMedios = data.totalCount;
    });

    this.atoresService
    .getNumberOfAtoresComplexos(
      this.projetoId
    )
    .subscribe((data) => {
      this.atoresComplexos = data.totalCount;
    });
  }
}
