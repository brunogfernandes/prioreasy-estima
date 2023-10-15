import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Colaborador } from '../../models/colaborador';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto';

@Component({
  selector: 'app-colaboradores-projeto',
  templateUrl: './colaboradores-projeto.component.html',
  styleUrls: ['./colaboradores-projeto.component.css']
})
export class ColaboradoresProjetoComponent {
  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  // datasource
  colaboradores: Colaborador[] = [];

  // tabela
  colunasTabela: string[] = [
    'Nome',
    'Email',
    'Cargo',
  ];

  camposEntidade: string[] = [
    'nome',
    'email',
    'cargo',
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  // metrics
  quantidadeProjetos: number = 0;
  novosProjetos: number = 0;
  projetosEmAndamento: number = 0;
  projetosConcluidos: number = 0;

  // diálogo de confirmação
  showModal: boolean = false;
  itemExclusao!: number;
  tituloDialogo: string = "Deseja realmente remover o colaborador do projeto?";
  mensagemDialogo: string = "Essa ação é irreversível. O colaborador perderá acesso total ao projeto.";

  ngOnInit(){
    this.buscarProjeto(this.projetoId, this.userId);
    this.executarBusca();
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
      this.projetoService
      .getColaboradoresByProjeto(
        this.projetoId,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());
    } else {
      this.projetoService
      .getColaboradoresByProjetoAndNome(
        this.projetoId,
        this.filterValue,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());
    }
  }

  private processarResultado() {
    return (data: any) => {
      this.colaboradores = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  openNewColaborador(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-colaborador']);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.projetoService.removeColaborador(this.projetoId, this.itemExclusao).subscribe(() => {
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
