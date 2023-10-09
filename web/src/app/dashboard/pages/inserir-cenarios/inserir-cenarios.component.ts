import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cenarios } from '../../shared/models/cenarios';
import { CenarioService } from '../../services/cenario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-cenarios',
  templateUrl: './inserir-cenarios.component.html',
  styleUrls: ['./inserir-cenarios.component.css']
})
export class InserirCenariosComponent {

  cenarioFormGroup!: FormGroup;
  cenario!: Cenarios;
  userId!: number;

  constructor(
    private cenarioService: CenarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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
  }

  get nome() {  return this.cenarioFormGroup.get('nome'); }
  get descricao() {  return this.cenarioFormGroup.get('descricao'); }
  get tipo() {  return this.cenarioFormGroup.get('tipo'); }

  createCenario(): Cenarios {
    return new Cenarios(
      this.nome!.value,
      this.tipo!.value,
      this.descricao!.value
    );
  }

  onSubmit(): void {
    if (this.cenarioFormGroup.invalid) {
      this.cenarioFormGroup.markAllAsTouched();
      return;
    } else {
      this.cenario = this.createCenario();

      this.cenarioService.create(this.cenario).subscribe({
        next: (id) => {
          this.router.navigate([`/dashboard/cenarios/:id}`]);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }

}
