import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Atores } from '../../shared/models/atores';
import { AtorService } from '../../services/ator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-atores',
  templateUrl: './inserir-atores.component.html',
  styleUrls: ['./inserir-atores.component.css']
})

export class InserirAtoresComponent {
  atorFormGroup!: FormGroup;
  ator!: Atores;
  userId!: number;

  constructor(
    private atorService: AtorService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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
  }

  get nome() {  return this.atorFormGroup.get('nome'); }
  get descricao() {  return this.atorFormGroup.get('descricao'); }
  get complexidade() {  return this.atorFormGroup.get('complexidade'); }

  createAtor(): Atores {
    return new Atores(
      this.nome!.value,
      this.complexidade!.value,
      this.descricao!.value
    );
  }

  onSubmit(): void {
    if (this.atorFormGroup.invalid) {
      this.atorFormGroup.markAllAsTouched();
      return;
    } else {
      this.ator = this.createAtor();

      this.atorService.create(this.ator).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/atores/id']); // Arrumar Aqui
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
