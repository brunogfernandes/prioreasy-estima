import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fatAmbPro } from '../../shared/models/fatAmbPro';
import { FatAmbProService } from '../../services/fatAmbPro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-fator-ambiental',
  templateUrl: './editar-fator-ambiental.component.html',
  styleUrls: ['./editar-fator-ambiental.component.css']
})
export class EditarFatorAmbientalComponent {

  FatorFormGroup!: FormGroup;
    FatorAmbPro!: fatAmbPro;
    fatorId!: number;

    constructor(
      private fatorAmbProService: FatAmbProService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
    ) {
      this.fatorId = +this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
      this.FatorFormGroup = this.formBuilder.group({
        valor: new FormControl('', [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
        ]),

      });

      this.inicializarFormulario();
    }

    inicializarFormulario(): void {
      this.fatorAmbProService.listById(this.fatorId).subscribe({
        next: (fator) => {
          this.FatorFormGroup.patchValue({
            valor: fator.valor,
            });
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }

    get valor() {  return this.FatorFormGroup.get('valor'); }

    createFator(): fatAmbPro {
      return new fatAmbPro(
        this.valor!.value,
      );
    }

    onSubmit(): void {
      if (this.FatorFormGroup.invalid) {
        this.FatorFormGroup.markAllAsTouched();
        return;
      } else {
        this.FatorAmbPro = this.createFator();

        this.fatorAmbProService.update(this.FatorAmbPro).subscribe({
          next: () => {
            this.router.navigate(['/dashboard/fatores-ambientais']);
          },

          error: (err) => {
            console.log('Error', err);
          },
        });
      }
    }
}
