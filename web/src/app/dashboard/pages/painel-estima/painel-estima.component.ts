import { Component } from '@angular/core';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-painel-estima',
  templateUrl: './painel-estima.component.html',
  styleUrls: ['./painel-estima.component.css']
})
export class PainelEstimaComponent {
  userId!: number;
  projectId!: number;
  projeto!: Projeto;

  showModal: boolean = false;
  tituloDialogo: string = "Deseja realmente excluir este projeto?";
  mensagemDialogo: string = "Essa ação é irreversível. Todos os dados do projeto em questão serão excluídos do sistema.";

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(){
    this.buscarProjeto(this.projectId, this.userId);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }
  openProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projectId]);
  }
  openAtores() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'atores']);
  }

  openRequisitos() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'requisitos']);
  }
  openFatorAmbiental() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'fatores-ambientais']);
  }
  openFatorTecnico() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'fatores-tecnicos']);
  }
  openEstimativa() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'estimativa']);
  }

  onEdit() {
    this.router.navigate(['/dashboard/editar-projeto/', this.projectId]);
  }

  onDelete() {
    this.showModal = true;
  }

  cancelarExclusao() {
    this.showModal = false;
  }

  confirmarExclusao() {
    this.projetoService.delete(this.projectId).subscribe(() => {
      this.showModal = false;
      this.router.navigate(['/dashboard/projetos']);
    });
  }
}
