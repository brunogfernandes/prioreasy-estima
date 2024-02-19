import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TesteService } from '../../services/test.service';
import { Teste } from '../../models/teste';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Colaborador } from '../../models/colaborador';
import { CasoUsoService } from '../../services/casoUso.service';
import { casoUso } from '../../models/casoUso';

@Component({
  selector: 'app-inserir-teste',
  templateUrl: './inserir-teste.component.html',
  styleUrls: ['./inserir-teste.component.css']
})

export class InserirTesteComponent {
  testeFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  requisitoId!: number;
  userId!: number;

  testes!: Teste;
  colaboradores: Colaborador[] = [];
  casos: casoUso[] = [];

  constructor(
    private projetoService: ProjetoService,
    private testeService: TesteService,
    private casoUsoService: CasoUsoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.requisitoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  filterValue: string = "";
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  quantidadeElementos: number = 0;
  totalPaginas: number = 0;

  ngOnInit(): void {
    this.buscarProjeto(this.projetoId, this.userId);
    this.executarBusca();
    this.executarBusca2();
    this.testeFormGroup = this.formBuilder.group({
      numeroIdentificador: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      sprint: new FormControl('', [
        Validators.required,
      ]),

      status: new FormControl('', [
        Validators.required
      ]),

      objetivo: new FormControl('', [
        Validators.required
      ]),

      entrada: new FormControl('', [
        Validators.required
      ]),

      saida: new FormControl('', [
        Validators.required
      ]),

      erro: new FormControl('', [
        Validators.required
      ]),

      responsavelNome: new FormControl('',),

      casoUso: new FormControl(''),

    });



  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  private executarBusca(): void {
    if (!this.filterValue) {
      this.projetoService
        .getColaboradoresByProjeto(
          this.projetoId,
          this.paginaAtual,
          this.tamanhoPagina
        )
        .subscribe((data: any) => {
          this.preencherSelect(data.items);
        });
    } else {
      this.projetoService
        .getColaboradoresByProjetoAndNome(
          this.projetoId,
          this.filterValue,
          this.paginaAtual,
          this.tamanhoPagina
        )
        .subscribe((data: any) => {
          this.preencherSelect(data.items);
        });
    }
  }

  private preencherSelect(colaboradores: any[]): void {
    this.colaboradores = colaboradores.map(colaborador => ({
      id: colaborador.id,
      nome: colaborador.nome,
      email: colaborador.email, // Adicione as propriedades faltantes
      empresa: colaborador.empresa,
      cargo: colaborador.cargo
    }));
  }

  private executarBusca2(): void {
    if (!this.filterValue) {
      this.casoUsoService
        .list(this.projetoId, this.requisitoId, this.paginaAtual, this.tamanhoPagina)
        .subscribe((data: any) => {
          this.preencherSelect2(data.items);
        });
    } else {
      this.casoUsoService
        .listByName(this.requisitoId, this.filterValue, this.paginaAtual, this.tamanhoPagina)
        .subscribe((data: any) => {
          this.preencherSelect2(data.items);
        });
    }
  }

  private preencherSelect2(casos: any[]): void {
    this.casos = casos.map(caso => ({
      id: caso.id,
      nome: caso.nome,
      complexidade: caso.complexidade,
      descricao: caso.descricao,
    }));
  }




  backToProjectHome() {
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }





  get numeroIdentificador() {
    return this.testeFormGroup.get('numeroIdentificador');
  }

  get nome() {
    return this.testeFormGroup.get('nome');
  }

  get sprint() {
    return this.testeFormGroup.get('sprint')
  }

  get status() {
    return this.testeFormGroup.get('status');
  }

  get objetivo() {
    return this.testeFormGroup.get('objetivo');
  }

  get entrada() {
    return this.testeFormGroup.get('entrada');
  }

  get saida() {
    return this.testeFormGroup.get('saida');
  }

  get erro() {
    return this.testeFormGroup.get('erro');
  }

  get responsavelNome() {
    return this.testeFormGroup.get('responsavelNome');
  }

  get casoUso() {
    return this.testeFormGroup.get('casoUso');
  }

  createTeste(): Teste {
    return new Teste(
      this.numeroIdentificador?.value,
      this.nome?.value,
      this.sprint?.value,
      this.status?.value,
      this.objetivo?.value,
      this.entrada?.value,
      this.saida?.value,
      this.erro?.value,
      this.responsavelNome?.value,
      this.casoUso?.value,
    );
  }

  onSubmit() {
    if (this.testeFormGroup.invalid) {
      this.testeFormGroup.markAllAsTouched();
      return;
    } else {
      this.testes = this.createTeste();
      console.log(this.testes);

      this.testeService.create(this.testes, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'painel-qahub']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}