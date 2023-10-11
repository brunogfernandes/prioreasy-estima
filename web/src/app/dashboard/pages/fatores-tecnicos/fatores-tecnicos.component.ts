import { Component } from '@angular/core';
import { FatTecService } from '../../services/fatTec.service';
import { FatTecProService } from '../../services/fatTecPro.service';
import { Router } from '@angular/router';
import { fatTec } from '../../shared/models/fatTec';
import { fatTecPro } from '../../shared/models/fatTecPro';

@Component({
  selector: 'app-fatores-tecnicos',
  templateUrl: './fatores-tecnicos.component.html',
  styleUrls: ['./fatores-tecnicos.component.css']
})
export class FatoresTecnicosComponent {

  constructor(
    private FatTecService: FatTecService,
    private FatTecProService: FatTecProService,
    private router: Router
  ) {}

  userId: number = +localStorage.getItem("usu_id")!;
  //proId: number = 1; // ACHAR UM JEITO DE COLOCAR  QUAL PROJETO ESTÁ RELACIONADO AOS ATORES (Arrumar aqui)


  // datasource
  fatTec: fatTec[] = [];
  fatTecPro: fatTecPro[] = [];

  // tabela
  colunasTabela: string[] = [
    'ID',
    'Descrição',
    'Peso'
  ];

  camposEntidade: string[] = [
    'id',
    'descricao',
    'peso',
  ];

  colunasTabela1: string[] = [
    'ID Fator Tecnico',
    'Valor'
  ];

  camposEntidade1: string[] = [
    'fator',
    'valor'

  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 13;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  // diálogo de confirmação
  /*
  showModal: boolean = false;
  itemExclusao!: number;
  tituloDialogo: string = "Deseja realmente excluir este cenario?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do cenario em questão serão excluídos do sistema.";
*/
  ngOnInit(){
    this.executarBusca();
    this.executarBusca1();
  }

  onSubmitSearch(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.executarBusca();
    this.executarBusca1();
  }

  private executarBusca(): void {
    this.FatTecService
      .findByDescricao(
        this.userId,
        this.filterValue,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());
  }
  private executarBusca1(): void {
    this.FatTecProService
    .findById(
      this.userId,
      this.paginaAtual,
      this.tamanhoPagina
    )
    .subscribe(this.processarResultado1());
  }

  private processarResultado() {
    return (data: any) => {
      this.fatTec = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }
  private processarResultado1() {
    return (data: any) => {
      this.fatTecPro = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }


  editarItem(item: any) {
    this.router.navigate(['/dashboard/editar-fator-tecnico/', item.id]);
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
