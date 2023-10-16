import { Component } from '@angular/core';
import { ResultadoRequisito } from '../../models/resultadoRequisito';
import { Router, ActivatedRoute } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';
import { RequisitoService } from '../../services/requisito.service';

@Component({
  selector: 'app-painel-prioreasy',
  templateUrl: './painel-prioreasy.component.html',
  styleUrls: ['./painel-prioreasy.component.css']
})
export class PainelPrioreasyComponent {
  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private requisitoService: RequisitoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  // datasource
  requisitos: ResultadoRequisito[] = [];

  // tabela
  colunasTabela: string[] = [
    'RF#',
    'Nome',
    'Resultado Final',
  ];

  camposEntidade: string[] = [
    'numeroIdentificador',
    'nome',
    'resultadoFinal',
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 5;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

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
      this.requisitoService.listResultado(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    } else {
      this.requisitoService.listResultadoByName(this.projetoId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    }
  }

  private processarResultado() {
    return (data: any) => {
      this.requisitos = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }

  openProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  openStakeholders(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'stakeholders']);
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
