import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-projeto',
  templateUrl: './inserir-projeto.component.html',
  styleUrls: ['./inserir-projeto.component.css']
})
export class InserirProjetoComponent {
  projetoFormGroup!: FormGroup;
  projeto!: Projeto;
  userId!: number;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projetoFormGroup = this.formBuilder.group({
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

      empresa: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),

      status: new FormControl('', [
        Validators.required,
      ]),

      dataInicio: new FormControl('', [
        Validators.required,
      ]),

      previsaoFim: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get nome() {  return this.projetoFormGroup.get('nome'); }
  get descricao() {  return this.projetoFormGroup.get('descricao'); }
  get empresa() {  return this.projetoFormGroup.get('empresa'); }
  get status() {  return this.projetoFormGroup.get('status'); }
  get dataInicio() {  return this.projetoFormGroup.get('dataInicio'); }
  get previsaoFim() {  return this.projetoFormGroup.get('previsaoFim'); }

  createProjeto(): Projeto {
    return new Projeto(
      this.nome!.value,
      this.descricao!.value,
      this.empresa!.value,
      this.status!.value,
      this.dataInicio!.value,
      this.previsaoFim!.value,
    );
  }

  onSubmit(): void {
    if (this.projetoFormGroup.invalid) {
      this.projetoFormGroup.markAllAsTouched();
      return;
    } else {
      this.projeto = this.createProjeto();

      this.projetoService.create(this.projeto).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projetos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
