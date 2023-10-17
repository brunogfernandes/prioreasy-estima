import { Component } from '@angular/core';
import { Cenarios } from '../../shared/models/cenarios';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CenarioService } from '../../services/cenario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cenarios',
  templateUrl: './editar-cenarios.component.html',
  styleUrls: ['./editar-cenarios.component.css']
})
export class EditarCenariosComponent {

    cenarioFormGroup!: FormGroup;
    cenario!: Cenarios;
    cenId!: number;
    casoId!: number;

    constructor(
      private cenarioService: CenarioService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
    ) {
      this.cenId = +this.route.snapshot.paramMap.get('id')!;
      this.casoId = this.route.snapshot.params['idCaso'];
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

      this.inicializarFormulario();
    }

    inicializarFormulario(): void {
      this.cenarioService.getById(this.cenId).subscribe({
        next: (cenario) => {
          this.cenarioFormGroup.patchValue({
            nome: cenario.nome,
            tipo: cenario.tipo,
            descricao: cenario.descricao,
            });
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }

    get nome() {  return this.cenarioFormGroup.get('nome'); }
    get descricao() {  return this.cenarioFormGroup.get('descricao'); }
    get tipo() {  return this.cenarioFormGroup.get('tipo'); }

    createCenario(): Cenarios {
      return new Cenarios(
        this.nome!.value,
        this.descricao!.value,
        this.tipo!.value,
        this.cenId
      );
    }

    onSubmit(): void {
      if (this.cenarioFormGroup.invalid) {
        this.cenarioFormGroup.markAllAsTouched();
        return;
      } else {
        this.cenario = this.createCenario();

        this.cenarioService.update(this.cenario,this.casoId).subscribe({
          next: () => {
            this.router.navigate(['/dashboard/cenarios/:id']); //arrumar aqui
          },

          error: (err) => {
            console.log('Error', err);
          },
        });
      }
    }
}
