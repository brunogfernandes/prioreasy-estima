import { Component } from '@angular/core';
import { PriorizacaoRequisito } from '../../models/priorizacaoRequisito';
import { Router, ActivatedRoute } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';
import { RequisitoService } from '../../services/requisito.service';

@Component({
  selector: 'app-painel-stakeholder',
  templateUrl: './painel-stakeholder.component.html',
  styleUrls: ['./painel-stakeholder.component.css']
})
export class PainelStakeholderComponent {
  userId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private requisitoService: RequisitoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  // datasource
  requisitos: PriorizacaoRequisito[] = [];

  // tabela
  colunasTabela: string[] = [
    'RF#',
    'Nome',
    'Resposta Positiva',
    'Resposta Negativa',
    'Classificação Requisito'
  ];

  camposEntidade: string[] = [
    'numeroIdentificador',
    'nome',
    'respostaPositiva',
    'respostaNegativa',
    'classificacaoRequisito'
  ];

  // formulario de busca
  filterValue: string = "";

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 5;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  ngOnInit(){
    this.buscarProjeto(this.userId);

  }

  buscarProjeto(id: number) {
    this.projetoService.findByIdStakeholder(id).subscribe((projeto) => {
      this.projeto = projeto;
      this.executarBusca(projeto.id);
    });
  }

  onSubmitSearch(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.executarBusca(this.projeto!.id!);
  }

  private executarBusca(id: number): void {
    if(!this.filterValue){
      this.requisitoService.listPriorizacaoStakeholder(id, this.userId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    } else {
      this.requisitoService.listPriorizacaoStakeholderByName(id, this.userId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
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

  openPriorizacao(){
    this.router.navigate(['/dashboard/priorizacao-stakeholder/', this.projeto.id!]);
  }

  prevPage() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.executarBusca(this.projeto!.id!);
    }
  }

  nextPage() {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.executarBusca(this.projeto!.id!);
    }
  }
}
