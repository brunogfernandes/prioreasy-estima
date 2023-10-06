import { Component } from '@angular/core';
import { CenarioService } from '../../services/cenario.service';
import { Router } from '@angular/router';
import { Cenarios } from '../../shared/models/cenarios';

@Component({
  selector: 'app-cenarios',
  templateUrl: './cenarios.component.html',
  styleUrls: ['./cenarios.component.css']
})
export class CenariosComponent {

  constructor(
    private cenarioService: CenarioService,
    private router: Router
  ) {}

  userId: number = +localStorage.getItem("usu_id")!;
  //proId: number = 1; // ACHAR UM JEITO DE COLOCAR  QUAL PROJETO ESTÁ RELACIONADO AOS ATORES (Arrumar aqui)


  // datasource
  cenarios: Cenarios[] = [];

  // tabela
  colunasTabela: string[] = [
    'Nome',
    'Tipo',
    'Descrição'
  ];

  camposEntidade: string[] = [
    'nome',
    'tipo',
    'descricao',
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 5;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  // diálogo de confirmação
  showModal: boolean = false;
  itemExclusao!: number;
  tituloDialogo: string = "Deseja realmente excluir este ator?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do ator em questão serão excluídos do sistema.";

  ngOnInit(){
    this.executarBusca();
  }

  onSubmitSearch(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.executarBusca();
  }

  private executarBusca(): void {
    this.cenarioService
      .findByNome(
        this.userId,
        this.filterValue,
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe(this.processarResultado());
  }

  private processarResultado() {
    return (data: any) => {
      this.cenarios = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }


  editarItem(item: any) {
    this.router.navigate(['/dashboard/editar-cenarios/', item.id]);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.cenarioService.delete(this.itemExclusao).subscribe(() => {
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

