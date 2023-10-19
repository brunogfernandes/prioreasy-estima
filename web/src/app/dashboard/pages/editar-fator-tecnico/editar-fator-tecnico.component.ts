import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fatTecPro } from '../../shared/models/fatTecPro';
import { FatTecProService } from '../../services/fatTecPro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-fator-tecnico',
  templateUrl: './editar-fator-tecnico.component.html',
  styleUrls: ['./editar-fator-tecnico.component.css']
})
export class EditarFatorTecnicoComponent {

  FatorFormGroup!: FormGroup;
  FatorTecPro!: fatTecPro;
  fatorId!: number;
  projetoId!: number;

  constructor(
    private fatorTecProService: FatTecProService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.fatorId = +this.route.snapshot.paramMap.get('idfat')!;
    this.projetoId = +this.route.snapshot.paramMap.get('id')!;
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
    this.fatorTecProService.listById(this.fatorId).subscribe({
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

  createFator(): fatTecPro {
    return new fatTecPro(
      this.valor!.value,
      this.fatorId,
      this.projetoId
    );
  }

  onSubmit(): void {
    if (this.FatorFormGroup.invalid) {
      this.FatorFormGroup.markAllAsTouched();
      return;
    } else {
      this.FatorTecPro = this.createFator();

      this.fatorTecProService.update(this.FatorTecPro).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'fatores-tecnicos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }

}

