import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { Teste } from '../../models/teste';
import { ProjetoService } from '../../services/projeto.service';
import { CasoUsoService } from '../../services/casoUso.service';
import { TesteService } from '../../services/test.service';


@Component({
    selector: 'app-painel-qahub',
    templateUrl: './painel-qahub.component.html',
    styleUrls: ['./painel-qahub.component.css']
})
export class PainelQahubComponent {
    userId!: number;
    projetoId!: number;
    projeto!: Projeto;

    constructor(
        private projetoService: ProjetoService,
        private testeService: TesteService,
        private casoUso: CasoUsoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.projetoId = this.route.snapshot.params['id'];
        this.userId = Number(localStorage.getItem('usu_id'));
    }

    testes: Teste[] = [];

    colunasTabela: string[] = [
        'CT#',
        'Nome',
        'Sprint',
        'Status',
    ];

    camposEntidade: string[] = [
        'numeroIdentificador',
        'nome',
        'sprint',
        'status',
    ];
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
          this.testeService.list(this.projetoId, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
        } else {
          this.testeService.listResultadoByName(this.projetoId, this.filterValue, this.paginaAtual, this.tamanhoPagina).subscribe(this.processarResultado());
        }
      }
    
      private processarResultado() {
        return (data: any) => {
          this.testes = data.items;
          this.paginaAtual = data.page.number;
          this.tamanhoPagina = data.page.size;
          this.quantidadeElementos = data.page.totalElements;
          this.totalPaginas = data.page.totalPages;
        };
      }
      
    
      openProjectHome(){
        this.router.navigate(['/dashboard/projeto/', this.projetoId]);
      }


      visualizarItem(item: any) {
        this.router.navigate(['/dashboard/projeto/', this.projetoId,'visualizar-item',item.id]);
      }
    
      editarItem(item: any) {
        this.router.navigate(['/dashboard/editar-projeto/', item.id]);
      }
      
      /*
      excluirItem(item: any) {
        this.itemExclusao = item.id;
        this.showModal = true;
      }
    
      cancelarExclusao() {
        this.showModal = false;
      }
    
      confirmarExclusao() {
        this.projetoService.delete(this.itemExclusao).subscribe(() => {
          this.showModal = false;
          this.executarBusca();
        });
      }
      */
    
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

      openNewTeste(){
        this.router.navigate(['/dashboard/projeto/', this.projetoId, 'inserir-teste']);
      }
}