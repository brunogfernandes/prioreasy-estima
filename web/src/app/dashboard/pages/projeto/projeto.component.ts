import { Component, Input } from '@angular/core';
import { ProjetoService } from '../../services/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css'],
})
export class ProjetoComponent {
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

  openColaboradores() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'colaboradores']);
  }

  openRequisitos() {
    this.router.navigate(['/dashboard/projeto/', this.projectId, 'requisitos']);
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
