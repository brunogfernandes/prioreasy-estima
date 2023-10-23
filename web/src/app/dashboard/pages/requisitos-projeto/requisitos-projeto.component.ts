import { Component } from '@angular/core';
import { RequisitoService } from '../../services/requisito.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { Requisito } from '../../models/requisito';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-requisitos-projeto',
  templateUrl: './requisitos-projeto.component.html',
  styleUrls: ['./requisitos-projeto.component.css']
})
export class RequisitosProjetoComponent {
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
  requisitos: Requisito[] = [];

  // tabela
  colunasTabela: string[] = [
    'RF#',
    'Nome',
    'Especificação',
  ];

  camposEntidade: string[] = [
    'numeroIdentificador',
    'nome',
    'especificacao',
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
  tituloDialogo: string = "Deseja realmente remover o requisito do projeto?";
  mensagemDialogo: string = "Ao confirmar, o requisito será removido do projeto.";

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
      this.requisitoService.list(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    } else {
      this.requisitoService.listByName(this.projetoId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
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

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  openNewRequisito(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-requisito']);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  editarItem(item: any) {
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'editar-requisito', item.id]);
  }

  visualizarCasoDeUso(item: any){
    this.router.navigate(['/dashboard/projeto/', this.projetoId,'requisitos', item.id, 'caso-de-uso' ]);
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.requisitoService.delete(this.itemExclusao).subscribe(() => {
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
