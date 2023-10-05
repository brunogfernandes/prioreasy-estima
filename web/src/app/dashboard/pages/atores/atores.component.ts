import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AtorService } from '../../services/ator.service';
import { Atores } from '../../shared/models/atores';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.component.html',
  styleUrls: ['./atores.component.css']
})
export class AtoresComponent {

  constructor(
    private atoresService: AtorService,
    private router: Router
  ) {}

  userId: number = +localStorage.getItem("usu_id")!;
  proId: number = 1; // ACHAR UM JEITO DE COLOCAR  QUAL PROJETO ESTÁ RELACIONADO AOS ATORES (Arrumar aqui)


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
    this.executarBusca();
    //this.buscarMetricas();
  }

  onSubmitSearch(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.executarBusca();
  }

  private executarBusca(): void {
    this.atoresService
      .findByNome(
        this.proId,
        this.filterValue,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());

    this.buscarMetricas();
  }

  private buscarMetricas(): void {

    this.atoresService
    .getNumberOfAtores(
      this.userId
    )
    .subscribe((data) => {
      this.totalAtores = data.totalCount;
    });

    this.atoresService
    .getNumberOfAtoresSimples(
      this.userId
    )
    .subscribe((data) => {
      this.atoresSimples = data.totalCount;
    });

    this.atoresService
    .getNumberOfAtoresMedios(
      this.userId
    )
    .subscribe((data) => {
      this.atoresMedios = data.totalCount;
    });

    this.atoresService
    .getNumberOfAtoresComplexos(
      this.userId
    )
    .subscribe((data) => {
      this.atoresComplexos = data.totalCount;
    });

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


  editarItem(item: any) {
    this.router.navigate(['/dashboard/editar-atores/', item.id]);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
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

}
