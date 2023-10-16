import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { Stakeholder } from '../../models/stakeholder';
import { ProjetoService } from '../../services/projeto.service';
import { StakeholderService } from '../../services/stakeholder.service';

@Component({
  selector: 'app-stakeholders-projeto',
  templateUrl: './stakeholders-projeto.component.html',
  styleUrls: ['./stakeholders-projeto.component.css'],
})
export class StakeholdersProjetoComponent {
  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  constructor(
    private projetoService: ProjetoService,
    private stakeholderService: StakeholderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  // datasource
  stakeholders: Stakeholder[] = [];

  // tabela
  colunasTabela: string[] = ['Nome', 'Cargo', 'Participação', 'Alerta'];

  camposEntidade: string[] = [
    'nome',
    'cargo',
    'participacaoRealizada',
    'alertaEmitido',
  ];

  // formulario de busca
  filterValue: string = '';

  // paginação
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  // metrics
  quantidadeProjetos: number = 0;
  novosProjetos: number = 0;
  projetosEmAndamento: number = 0;
  projetosConcluidos: number = 0;

  // diálogo de confirmação
  showModal: boolean = false;
  itemExclusao!: number;
  tituloDialogo: string = 'Deseja realmente remover o stakeholder do projeto?';
  mensagemDialogo: string =
    'Essa ação é irreversível. O stakeholder perderá acesso total ao projeto e ao Prioreasy.';

  // diálogo de confirmação alerta
  showAlertModal: boolean = false;
  itemAlerta!: number;
  tituloDialogoAlerta: string = 'Deseja realmente alertar o stakeholder?';
  mensagemDialogoAlerta: string =
    'O Stakeholder receberá um alerta pedindo a sua participação no processo de priorização.';

  ngOnInit() {
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
    if (!this.filterValue) {
      this.stakeholderService
        .listByProjeto(this.projetoId, this.paginaAtual, this.tamanhoPagina)
        .subscribe(this.processarResultado());
    } else {
      this.stakeholderService
        .listByName(
          this.projetoId,
          this.filterValue,
          this.paginaAtual,
          this.tamanhoPagina
        )
        .subscribe(this.processarResultado());
    }
  }

  private processarResultado() {
    return (data: any) => {
      this.stakeholders = data.items;
      this.paginaAtual = data.page.number;
      this.tamanhoPagina = data.page.size;
      this.quantidadeElementos = data.page.totalElements;
      this.totalPaginas = data.page.totalPages;
    };
  }

  backToPrioreasy() {
    this.router.navigate([
      '/dashboard/projeto/',
      this.projetoId,
      'painel-prioreasy',
    ]);
  }

  openNewStakeholder() {
    this.router.navigate([
      '/dashboard/projeto/',
      this.projetoId,
      'inserir-stakeholder',
    ]);
  }

  excluirItem(item: any) {
    this.itemExclusao = item.id;
    this.showModal = true;
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.stakeholderService
    .delete(this.itemExclusao)
      .subscribe(() => {
        this.showModal = false;
        this.executarBusca();
      });
  }

  alertarItem(item: any) {
    this.itemAlerta = item.id;
    this.showAlertModal = true;
  }

  cancelarAlerta() {
    this.showAlertModal = false;
  }

  confirmarAlerta() {
    this.stakeholderService.alert(this.itemAlerta).subscribe(() => {
      this.showAlertModal = false;
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
