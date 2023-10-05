import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { casoUso } from '../../shared/models/casoUso';
import { CasoUsoService } from '../../services/casoUso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-caso',
  templateUrl: './editar-caso.component.html',
  styleUrls: ['./editar-caso.component.css']
})
export class EditarCasoComponent {
    casoUsoFormGroup!: FormGroup;
    casoUso!: casoUso;
    casoId!: number;

    constructor(
      private casoUsoService: CasoUsoService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
    ) {
      this.casoId = +this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
      this.casoUsoFormGroup = this.formBuilder.group({
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

      this.inicializarFormulario();
    }

    inicializarFormulario(): void {
      this.casoUsoService.findById(this.casoId).subscribe({
        next: (casoUso) => {
          this.casoUsoFormGroup.patchValue({
            nome: casoUso.nome,
            complexidade: casoUso.complexidade,
            descricao: casoUso.descricao,
            });
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }

    get nome() {  return this.casoUsoFormGroup.get('nome'); }
    get descricao() {  return this.casoUsoFormGroup.get('descricao'); }
    get complexidade() {  return this.casoUsoFormGroup.get('complexidade'); }

    createCaso(): casoUso {
      return new casoUso(
        this.nome!.value,
        this.descricao!.value,
        this.complexidade!.value,
        this.casoId
      );
    }

    onSubmit(): void {
      if (this.casoUsoFormGroup.invalid) {
        this.casoUsoFormGroup.markAllAsTouched();
        return;
      } else {
        this.casoUso = this.createCaso();

        this.casoUsoService.update(this.casoUso).subscribe({
          next: () => {
            this.router.navigate(['/dashboard/caso-de-uso/:id']); //arrumar aqui
          },

          error: (err) => {
            console.log('Error', err);
          },
        });
      }
    }
}
