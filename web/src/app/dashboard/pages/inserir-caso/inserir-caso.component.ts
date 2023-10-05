import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { casoUso } from '../../shared/models/casoUso';
import { CasoUsoService } from '../../services/casoUso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-caso',
  templateUrl: './inserir-caso.component.html',
  styleUrls: ['./inserir-caso.component.css']
})
export class InserirCasoComponent {
  casoUsoFormGroup!: FormGroup;
  casoUso!: casoUso;
  userId!: number;

  constructor(
    private casoUsoService: CasoUsoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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
  }

  get nome() {  return this.casoUsoFormGroup.get('nome'); }
  get descricao() {  return this.casoUsoFormGroup.get('descricao'); }
  get complexidade() {  return this.casoUsoFormGroup.get('complexidade'); }

  createCaso(): casoUso {
    return new casoUso(
      this.nome!.value,
      this.complexidade!.value,
      this.descricao!.value
    );
  }

  onSubmit(): void {
    if (this.casoUsoFormGroup.invalid) {
      this.casoUsoFormGroup.markAllAsTouched();
      return;
    } else {
      this.casoUso = this.createCaso();

      this.casoUsoService.create(this.casoUso).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/caso-de-uso/id']); // Arrumar Aqui
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
