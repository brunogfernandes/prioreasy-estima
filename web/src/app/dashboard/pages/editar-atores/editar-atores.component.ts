import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Atores } from '../../shared/models/atores';
import { AtorService } from '../../services/ator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-atores',
  templateUrl: './editar-atores.component.html',
  styleUrls: ['./editar-atores.component.css']
})
export class EditarAtoresComponent {

  atorFormGroup!: FormGroup;
  ator!: Atores;
  atorId!: number;

  constructor(
    private atorService: AtorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.atorId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.atorFormGroup = this.formBuilder.group({
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
    this.atorService.findById(this.atorId).subscribe({
      next: (ator) => {
        this.atorFormGroup.patchValue({
          nome: ator.nome,
          descricao: ator.descricao,
          complexidade: ator.complexidade,
          });
      },

      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  get nome() {  return this.atorFormGroup.get('nome'); }
  get descricao() {  return this.atorFormGroup.get('descricao'); }
  get complexidade() {  return this.atorFormGroup.get('complexidade'); }

  createAtor(): Atores {
    return new Atores(
      this.nome!.value,
      this.descricao!.value,
      this.complexidade!.value,
      this.atorId
    );
  }

  onSubmit(): void {
    if (this.atorFormGroup.invalid) {
      this.atorFormGroup.markAllAsTouched();
      return;
    } else {
      this.ator = this.createAtor();

      this.atorService.update(this.ator).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/atores/:id']); //arrumar aqui
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
