import { Component } from '@angular/core';
import { Cenarios } from '../../models/cenarios';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CenarioService } from '../../services/cenario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-editar-cenarios',
  templateUrl: './editar-cenarios.component.html',
  styleUrls: ['./editar-cenarios.component.css']
})
export class EditarCenariosComponent {

  cenarioFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;
  RequisitoId!: number;
  casoId!: number;
  cenarioId!: number;

  cenario!: Cenarios;

  constructor(
    private projetoService: ProjetoService,
    private cenarioService: CenarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['idPro'];
    this.RequisitoId = this.route.snapshot.params['idReq'];
    this.casoId = this.route.snapshot.params['id'];
    this.cenarioId = this.route.snapshot.params['idCen'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.cenarioFormGroup = this.formBuilder.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),

      tipo: new FormControl('', [
        Validators.required,
      ]),
    });

    this.buscarProjeto(this.projetoId, this.userId);
    this.inicializarForm();
  }

  inicializarForm(){
    this.cenarioService.getById(this.cenarioId).subscribe((cenario) => {
      this.cenarioFormGroup.patchValue(cenario);
    })
  }

  backToCenarioHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.RequisitoId, 'caso-de-uso', this.casoId, 'cenarios']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get nome() {
    return this.cenarioFormGroup.get('nome');
  }
  get tipo() {
    return this.cenarioFormGroup.get('tipo');
  }
  get descricao() {
    return this.cenarioFormGroup.get('descricao');
  }

  createCenario(): Cenarios {
    return new Cenarios(
      this.nome?.value,
      this.descricao?.value,
      this.tipo?.value,
      this.cenarioId
    );
  }

  onSubmit() {
    if (this.cenarioFormGroup.invalid) {
      this.cenarioFormGroup.markAllAsTouched();
      return;
    } else {
      this.cenario = this.createCenario();

      this.cenarioService.update(this.cenario, this.casoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.RequisitoId, 'caso-de-uso', this.casoId, 'cenarios']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
