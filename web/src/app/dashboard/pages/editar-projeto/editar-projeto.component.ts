import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from '../../services/projeto.service';
import { Projeto } from '../../models/projeto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-projeto',
  templateUrl: './editar-projeto.component.html',
  styleUrls: ['./editar-projeto.component.css']
})
export class EditarProjetoComponent {
  projetoFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = +this.route.snapshot.paramMap.get('id')!;
  }

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

    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.projetoService.findById(this.projetoId).subscribe({
      next: (projeto) => {
        this.projetoFormGroup.patchValue({
          nome: projeto.nome,
          descricao: projeto.descricao,
          empresa: projeto.empresa,
          status: projeto.status,
          dataInicio: `${projeto.dataInicio.split('/')[2]}-${projeto.dataInicio.split('/')[1]}-${projeto.dataInicio.split('/')[0]}`,
          previsaoFim: `${projeto.previsaoFim.split('/')[2]}-${projeto.previsaoFim.split('/')[1]}-${projeto.previsaoFim.split('/')[0]}`,
        });
      },

      error: (err) => {
        console.log('Error', err);
      },
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
      this.projetoId
    );
  }

  onSubmit(): void {
    if (this.projetoFormGroup.invalid) {
      this.projetoFormGroup.markAllAsTouched();
      return;
    } else {
      this.projeto = this.createProjeto();

      this.projetoService.update(this.projeto).subscribe({
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
