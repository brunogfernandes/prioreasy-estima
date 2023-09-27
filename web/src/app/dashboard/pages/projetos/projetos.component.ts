import { Component } from '@angular/core';
import { Projetos } from '../../shared/models/projetos';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent {

  constructor(
    private projetoService: ProjetoService,
    private router: Router
  ) {}

  userId: number = +localStorage.getItem("usu_id")!;

  // datasource
  projetos: Projetos[] = [];

  // tabela
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
    'previsaoFim',
    'status',
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 5;
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
  tituloDialogo: string = "Deseja realmente excluir este projeto?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do projeto em questão serão excluídos do sistema.";

  ngOnInit(){
    this.executarBusca();
    this.buscarMetricas();
  }

  onSubmitSearch(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.executarBusca();
  }

  private executarBusca(): void {
    this.projetoService
      .findByNome(
        this.userId,
        this.filterValue,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());

    this.buscarMetricas();
  }

  private buscarMetricas(): void {
    this.projetoService
    .getNumberOfProjetos(
      this.userId
    )
    .subscribe((data) => {
      this.quantidadeProjetos = data.totalCount;
    });

    this.projetoService
    .getNumberOfNovosProjetos(
      this.userId
    )
    .subscribe((data) => {
      this.novosProjetos = data.totalCount;
    });

    this.projetoService
    .getNumberOfProjetosEmAndamento(
      this.userId
    )
    .subscribe((data) => {
      this.projetosEmAndamento = data.totalCount;
    });

    this.projetoService
    .getNumberOfProjetosConcluidos(
      this.userId
    )
    .subscribe((data) => {
      this.projetosConcluidos = data.totalCount;
    });
  }

  private processarResultado() {
    return (data: any) => {
      this.projetos = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }


  editarItem(item: any) {
    this.router.navigate(['/dashboard/editar-projeto/', item.id]);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.projetoService.delete(this.itemExclusao).subscribe(() => {
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
