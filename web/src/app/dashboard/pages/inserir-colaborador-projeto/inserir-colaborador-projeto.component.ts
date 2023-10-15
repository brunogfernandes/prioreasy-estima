import { Component } from '@angular/core';
import { ColaboradorService } from '../../services/colaborador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Colaborador } from '../../models/colaborador';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-inserir-colaborador-projeto',
  templateUrl: './inserir-colaborador-projeto.component.html',
  styleUrls: ['./inserir-colaborador-projeto.component.css'],
})
export class InserirColaboradorProjetoComponent {
  userId!: number;
  projetoId!: number;
  projeto!: Projeto;

  colaboradores: Colaborador[] = [];
  selectedColaborador!: Colaborador;

  constructor(
    private projetoService: ProjetoService,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  // formulario de busca
  filterValue: string = '';

  ngOnInit() {
    this.buscarProjeto(this.projetoId, this.userId);
    this.executarBusca();
  }

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
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

  executarBusca() {
    this.colaboradorService
      .findByNome(this.filterValue, this.projetoId)
      .subscribe((colaboradores) => {
        this.colaboradores = colaboradores;
        console.log(colaboradores);
      });
  }

  selectColaborador(colaborador: Colaborador) {
    this.selectedColaborador = colaborador;
  }

  addColaborador() {
    this.projetoService
      .addColaborador(this.projetoId, this.selectedColaborador.id!)
      .subscribe(() => {
        this.router.navigate([
          `/dashboard/projeto/${this.projetoId}/colaboradores`,
        ]);
      });
  }
}
