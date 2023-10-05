import { Component } from '@angular/core';
import { CasoUsoService } from '../../services/casoUso.service';
import { Router } from '@angular/router';
import { casoUso } from '../../shared/models/casoUso';

@Component({
  selector: 'app-caso-de-uso',
  templateUrl: './caso-de-uso.component.html',
  styleUrls: ['./caso-de-uso.component.css']
})
export class CasoDeUsoComponent {
    constructor(
      private casoUsoService: CasoUsoService,
      private router: Router
    ) {}

    userId: number = +localStorage.getItem("usu_id")!;
    ucId: number = 1; // ACHAR UM JEITO DE COLOCAR  QUAL PROJETO ESTÁ RELACIONADO AOS ATORES (Arrumar aqui)


    // datasource
    caso: casoUso[] = [];

    // tabela
    colunasTabela: string[] = [
      'Nome',
      'Complexidade',
      'Descrição',
      'Cenários',
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
    /*
    totalAtores: number = 0;
    atoresSimples: number = 0;
    atoresMedios: number = 0;
    atoresComplexos: number = 0;
    */
    // diálogo de confirmação
    showModal: boolean = false;
    itemExclusao!: number;
    tituloDialogo: string = "Deseja realmente excluir este caso de uso?";
    mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do caso de uso em questão serão excluídos do sistema.";

    ngOnInit(){
      this.executarBusca();
      //this.buscarMetricas();
    }

    onSubmitSearch(event: Event): void {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.executarBusca();
    }

    private executarBusca(): void {
      this.casoUsoService
        .findByNome(
          this.ucId,
          this.filterValue,
          this.paginaAtual,
          this.tamanhoPagina
        )
        .subscribe(this.processarResultado());

      //this.buscarMetricas();
    }
/*
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
*/

    private processarResultado() {
      return (data: any) => {
        this.caso = data.items;
        this.paginaAtual = data.page.number;
        this.tamanhoPagina = data.page.size;
        this.quantidadeElementos = data.page.totalElements;
        this.totalPaginas = data.page.totalPages;
      };
    }


    editarItem(item: any) {
      this.router.navigate(['/dashboard/editar-caso/', item.id]);
    }

    excluirItem(item: any) {
      this.itemExclusao = item.id;
      this.showModal = true;
    }

    cancelarExclusao() {
      this.showModal = false;
    }

    confirmarExclusao() {
      this.casoUsoService.delete(this.itemExclusao).subscribe(() => {
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
