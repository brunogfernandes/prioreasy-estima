import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';
import { RequisitoService } from '../../services/requisito.service';
import { PriorizacaoRequisito } from '../../models/priorizacaoRequisito';
import calcularResultadoFinal from '../../utils/calcularResultadoFinal';
import { PriorizacaoService } from '../../services/priorizacao.service';

@Component({
  selector: 'app-priorizar-requisitos',
  templateUrl: './priorizar-requisitos.component.html',
  styleUrls: ['./priorizar-requisitos.component.css'],
})
export class PriorizarRequisitosComponent {
  priorizacaoFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;
  requisitoId!: number;

  requisitoAtual!: PriorizacaoRequisito;
  indiceAtual!: number;
  requisitoList!: PriorizacaoRequisito[];
  classificacaoFinalAtual!: string | undefined;

  tituloDialogo: string = 'Completar priorização de requisitos?';
  mensagemDialogo: string =
    'Ao completar a priorização de requisitos, você não poderá mais alterar as respostas. Deseja continuar?';
  showModal: boolean = false;

  constructor(
    private projetoService: ProjetoService,
    private requisitoService: RequisitoService,
    private priorizacaoService: PriorizacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.priorizacaoFormGroup = this.formBuilder.group({
      numeroIdentificador: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      especificacao: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ]),

      respostaPositiva: new FormControl('', [Validators.required]),

      respostaNegativa: new FormControl('', [Validators.required]),
    });

    this.buscarProjeto(this.projetoId, this.userId);
    this.getRequisitoList();
  }

  atualizarForm() {
    this.priorizacaoFormGroup.controls['nome'].setValue(
      this.requisitoAtual.nome
    );
    this.priorizacaoFormGroup.controls['especificacao'].setValue(
      this.requisitoAtual.especificacao
    );
    this.priorizacaoFormGroup.controls['numeroIdentificador'].setValue(
      this.requisitoAtual.numeroIdentificador
    );

    this.priorizacaoFormGroup.controls['respostaPositiva'].setValue(
      this.requisitoAtual.respostaPositiva
    );
    this.priorizacaoFormGroup.controls['respostaNegativa'].reset(
      this.requisitoAtual.respostaNegativa
    );
  }

  getRequisitoList() {
    this.requisitoService
      .listRequisitosPriorizacaoStakeholder(this.projetoId)
      .subscribe((requisitos) => {
        this.requisitoAtual = requisitos.items[0];
        this.indiceAtual = 0;
        this.requisitoList = requisitos.items;
        this.atualizarForm();
      });
  }

  backToProjectHome() {
    this.router.navigate(['/dashboard/painel-stakeholder']);
  }

  backToPrevious() {
    this.indiceAtual--;
    this.requisitoAtual = this.requisitoList[this.indiceAtual];
    this.atualizarForm();
  }

  goToNext() {
    if (this.priorizacaoFormGroup.invalid) {
      this.priorizacaoFormGroup.markAllAsTouched();
      return;
    } else {
      this.classificacaoFinalAtual = calcularResultadoFinal(
        this.respostaPositiva!.value,
        this.respostaNegativa!.value
      );
      this.requisitoAtual = this.newPriorizacaoRequisito();
      this.requisitoList[this.indiceAtual] = this.requisitoAtual;

      this.indiceAtual++;
      this.requisitoAtual = this.requisitoList[this.indiceAtual];

      console.log(this.requisitoList);
      this.atualizarForm();
    }
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get nome() {
    return this.priorizacaoFormGroup.get('nome');
  }
  get especificacao() {
    return this.priorizacaoFormGroup.get('especificacao');
  }
  get numeroIdentificador() {
    return this.priorizacaoFormGroup.get('numeroIdentificador');
  }
  get respostaPositiva() {
    return this.priorizacaoFormGroup.get('respostaPositiva');
  }
  get respostaNegativa() {
    return this.priorizacaoFormGroup.get('respostaNegativa');
  }

  newPriorizacaoRequisito(): PriorizacaoRequisito {
    return new PriorizacaoRequisito(
      this.nome!.value,
      this.especificacao!.value,
      this.numeroIdentificador!.value,
      this.respostaPositiva!.value,
      this.respostaNegativa!.value,
      this.classificacaoFinalAtual!,
      this.requisitoAtual.id
    );
  }

  onSubmit() {
    if (this.priorizacaoFormGroup.invalid) {
      this.priorizacaoFormGroup.markAllAsTouched();
      return;
    } else {
      this.showModal = true;
    }
  }

  cancelarPriorizacao() {
    this.showModal = false;
  }

  confirmarPriorizacao() {
    this.classificacaoFinalAtual = calcularResultadoFinal(
      this.respostaPositiva!.value,
      this.respostaNegativa!.value
    );
    this.requisitoAtual = this.newPriorizacaoRequisito();
    this.requisitoList[this.indiceAtual] = this.requisitoAtual;

    this.requisitoList.forEach((requisito) => {
      this.priorizacaoService
        .insertPriorizacao(
          {
            requisito: requisito.id || 0,
            respostaPositiva: requisito.respostaPositiva,
            respostaNegativa: requisito.respostaNegativa,
            classificacaoRequisito: requisito.classificacaoRequisito,
          },
          this.userId
        )
        .subscribe((response) => {
          this.priorizacaoService
            .completePriorizacao(this.userId)
            .subscribe((response) => {
              this.router.navigate(['/dashboard/painel-stakeholder']);
            });
        });
    });
  }
}
