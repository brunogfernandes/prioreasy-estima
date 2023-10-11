import { Component } from '@angular/core';
import { FatAmbService } from '../../services/fatAmb.service';
import { FatAmbProService } from '../../services/fatAmbPro.service';
import { Router } from '@angular/router';
import { fatAmb } from '../../shared/models/fatAmb';
import { fatAmbPro } from '../../shared/models/fatAmbPro';

@Component({
  selector: 'app-fatores-ambientais',
  templateUrl: './fatores-ambientais.component.html',
  styleUrls: ['./fatores-ambientais.component.css']
})
export class FatoresAmbientaisComponent {

  constructor(
    private FatAmbService: FatAmbService,
    private FatAmbProService: FatAmbProService,
    private router: Router
  ) {}

  userId: number = +localStorage.getItem("usu_id")!;
  //proId: number = 1; // ACHAR UM JEITO DE COLOCAR  QUAL PROJETO ESTÁ RELACIONADO AOS ATORES (Arrumar aqui)


  // datasource
  fatAmb: fatAmb[] = [];
  fatAmbPro: fatAmbPro[] = [];

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
    'ID Fator Ambiental',
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
  tamanhoPagina: number = 8;
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
    this.FatAmbService
      .findByDescricao(
        this.userId,
        this.filterValue,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());
  }
  private executarBusca1(): void {
    this.FatAmbProService
    .findById(
      this.userId,
      this.paginaAtual,
      this.tamanhoPagina
    )
    .subscribe(this.processarResultado1());
  }

  private processarResultado() {
    return (data: any) => {
      this.fatAmb = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }
  private processarResultado1() {
    return (data: any) => {
      this.fatAmbPro = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }


  editarItem(item: any) {
    this.router.navigate(['/dashboard/editar-fator-ambiental/', item.id]);
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
