import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { casoUso } from '../../shared/models/casoUso';
import { CasoUsoService } from '../../services/casoUso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-editar-caso',
  templateUrl: './editar-caso.component.html',
  styleUrls: ['./editar-caso.component.css']
})
export class EditarCasoComponent {

  casoFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;
  RequisitoId!: number;
  casoUsoId!: number;

  casoUso!: casoUso;

  constructor(
    private projetoService: ProjetoService,
    private casoUsoService: CasoUsoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['idPro'];
    this.RequisitoId = this.route.snapshot.params['id'];
    this.casoUsoId = this.route.snapshot.params['idCaso'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.casoFormGroup = this.formBuilder.group({
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

      complexidade: new FormControl('', [
        Validators.required,
      ]),
    });

    this.buscarProjeto(this.projetoId, this.userId);
    this.inicializarForm();
  }

  inicializarForm(){
    this.casoUsoService.getById(this.casoUsoId).subscribe((caso) => {
      this.casoFormGroup.patchValue(caso);
    })
  }

  backToAtorHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.RequisitoId, 'caso-de-uso']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get nome() {
    return this.casoFormGroup.get('nome');
  }
  get complexidade() {
    return this.casoFormGroup.get('complexidade');
  }
  get descricao() {
    return this.casoFormGroup.get('descricao');
  }

  createCaso(): casoUso {
    return new casoUso(
      this.nome?.value,
      this.complexidade?.value,
      this.descricao?.value,
      this.casoUsoId
    );
  }

  onSubmit() {
    if (this.casoFormGroup.invalid) {
      this.casoFormGroup.markAllAsTouched();
      return;
    } else {
      this.casoUso = this.createCaso();

      this.casoUsoService.update(this.casoUso, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'requisitos', this.RequisitoId, 'caso-de-uso']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
