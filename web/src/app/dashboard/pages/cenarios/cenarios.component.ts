import { Component } from '@angular/core';
import { CenarioService } from '../../services/cenario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cenarios } from '../../shared/models/cenarios';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-cenarios',
  templateUrl: './cenarios.component.html',
  styleUrls: ['./cenarios.component.css']
})
export class CenariosComponent {


  userId!: number;
  projetoId!: number;
  requisitoId!: number;
  casoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private cenarioService: CenarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['idPro'];
    this.requisitoId = this.route.snapshot.params['idReq'];
    this.casoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }


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
      this.cenarioService.list(this.projetoId,this.requisitoId,this.casoId ,this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    } else {
      this.cenarioService.listByName(this.projetoId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
    }
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

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso', this.casoId, 'cenarios']);
  }

  openNewCenario(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso', this.casoId, 'inserir-cenario']);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  editarItem(item: any) {
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso', this.casoId, 'editar-cenario', item.id]);
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

