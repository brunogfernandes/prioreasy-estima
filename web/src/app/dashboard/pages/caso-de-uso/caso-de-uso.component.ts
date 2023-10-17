import { Component } from '@angular/core';
import { CasoUsoService } from '../../services/casoUso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { casoUso } from '../../shared/models/casoUso';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto';

@Component({
  selector: 'app-caso-de-uso',
  templateUrl: './caso-de-uso.component.html',
  styleUrls: ['./caso-de-uso.component.css']
})
export class CasoDeUsoComponent {

    userId!: number;
    requisitoId!: number;
    projetoId!: number;
    projeto!: Projeto;

    constructor(
      private projetoService: ProjetoService,
      private casoUsoService: CasoUsoService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.projetoId = this.route.snapshot.params['idPro'];
      this.requisitoId = this.route.snapshot.params['id'];
      this.userId = Number(localStorage.getItem('usu_id'));
    }

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

    totalCasos: number = 0;
    casosSimples: number = 0;
    casosMedios: number = 0;
    casosComplexos: number = 0;

    // diálogo de confirmação
    showModal: boolean = false;
    itemExclusao!: number;
    tituloDialogo: string = "Deseja realmente excluir este caso de uso?";
    mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do caso de uso em questão serão excluídos do sistema.";

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
        this.casoUsoService.list(this.requisitoId, this.projetoId ,this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
      } else {
        this.casoUsoService.listByName(this.requisitoId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
      }
    }

    backToProjectHome(){
      this.router.navigate(['dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso']);
    }

    openNewCaso(){
      this.router.navigate(['dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'inserir-caso']);
    }

    private buscarMetricas(): void {

      this.casoUsoService
      .getNumberOfCasos(
        this.requisitoId
      )
      .subscribe((data) => {
        this.totalCasos = data.totalCount;
      });

      this.casoUsoService
      .getNumberOfCasosSimples(
        this.requisitoId
      )
      .subscribe((data) => {
        this.casosSimples = data.totalCount;
      });

      this.casoUsoService
      .getNumberOfCasosMedios(
        this.requisitoId
      )
      .subscribe((data) => {
        this.casosMedios = data.totalCount;
      });

      this.casoUsoService
      .getNumberOfCasosComplexos(
        this.requisitoId
      )
      .subscribe((data) => {
        this.casosComplexos = data.totalCount;
      });

    }

    private processarResultado() {
      return (data: any) => {
        this.caso = data.items;
        this.paginaAtual = data.page.number;
        this.tamanhoPagina = data.page.size;
        this.quantidadeElementos = data.page.totalElements;
        this.totalPaginas = data.page.totalPages;
      };
    }

    VisualizarCenarios(item: any) {
      this.router.navigate(['dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso', item, 'cenarios']);
    }

    editarItem(item: any) {
      this.router.navigate(['dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'editar-caso' , item.id]);
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
