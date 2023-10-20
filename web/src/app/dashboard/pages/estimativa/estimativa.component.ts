import { Component } from '@angular/core';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';
import { EstimativaService } from '../../services/estimativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estimativa } from '../../shared/models/estimativa';

@Component({
  selector: 'app-estimativa',
  templateUrl: './estimativa.component.html',
  styleUrls: ['./estimativa.component.css']
})
export class EstimativaComponent {

  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private estimativaService: EstimativaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }


  // datasource
  estimativa: Estimativa[] = [];

  // tabela
  colunasTabela: string[] = [
    'E-Factor',
    'T-Factor',
    'Peso por Caso de Uso',
    'Peso por Ator',
    'Peso por Pontos por Caso de Uso',
    'Resultado em Horas',
    'Resultado dos Pontos por Caso de Uso'
  ];

  camposEntidade: string[] = [
    'efactor',
    'tfactor',
    'pesoCaso',
    'pesoAtor',
    'pesoPontos',
    'resHoras',
    'resPontos'
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


  private executarBusca(): void {

      this.estimativaService.list(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
  }

  private processarResultado() {
    return (data: any) => {
      this.estimativa = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  openNewEstimativa(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-estimativa']);
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
