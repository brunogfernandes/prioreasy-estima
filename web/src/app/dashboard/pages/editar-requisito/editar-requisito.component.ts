import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { Requisito } from '../../models/requisito';
import { ProjetoService } from '../../services/projeto.service';
import { RequisitoService } from '../../services/requisito.service';

@Component({
  selector: 'app-editar-requisito',
  templateUrl: './editar-requisito.component.html',
  styleUrls: ['./editar-requisito.component.css']
})
export class EditarRequisitoComponent {
  requisitoFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;
  requisitoId!: number;

  requisito!: Requisito;

  constructor(
    private projetoService: ProjetoService,
    private requisitoService: RequisitoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.requisitoId = this.route.snapshot.params['idReq'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.requisitoFormGroup = this.formBuilder.group({
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
    });

    this.buscarProjeto(this.projetoId, this.userId);
    this.inicializarForm();
  }

  inicializarForm(){
    this.requisitoService.getById(this.requisitoId).subscribe((requisito) => {
      this.requisitoFormGroup.patchValue(requisito);
    })
  }

  backToProjectHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId]);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get nome() {
    return this.requisitoFormGroup.get('nome');
  }
  get especificacao() {
    return this.requisitoFormGroup.get('especificacao');
  }
  get numeroIdentificador() {
    return this.requisitoFormGroup.get('numeroIdentificador');
  }

  createRequisito(): Requisito {
    return new Requisito(
      this.nome?.value,
      this.especificacao?.value,
      this.numeroIdentificador?.value,
      this.requisitoId
    );
  }

  onSubmit() {
    if (this.requisitoFormGroup.invalid) {
      this.requisitoFormGroup.markAllAsTouched();
      return;
    } else {
      this.requisito = this.createRequisito();

      this.requisitoService.update(this.requisito, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
