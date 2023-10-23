import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Atores } from '../../shared/models/atores';
import { AtorService } from '../../services/ator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-editar-atores',
  templateUrl: './editar-atores.component.html',
  styleUrls: ['./editar-atores.component.css']
})
export class EditarAtoresComponent {

  atorFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;
  AtorId!: number;

  Atores!: Atores;

  constructor(
    private projetoService: ProjetoService,
    private atorService: AtorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.AtorId = this.route.snapshot.params['idAtor'];
    this.userId = Number(localStorage.getItem('usu_id'));
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

    this.buscarProjeto(this.projetoId, this.userId);
    this.inicializarForm();
  }

  inicializarForm(){
    this.atorService.getById(this.AtorId).subscribe((ator) => {
      this.atorFormGroup.patchValue(ator);
    })
  }

  backToAtorHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'atores']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get nome() {
    return this.atorFormGroup.get('nome');
  }
  get complexidade() {
    return this.atorFormGroup.get('complexidade');
  }
  get descricao() {
    return this.atorFormGroup.get('descricao');
  }

  createAtor(): Atores {
    return new Atores(
      this.nome?.value,
      this.complexidade?.value,
      this.descricao?.value,
      this.AtorId
    );
  }

  onSubmit() {
    if (this.atorFormGroup.invalid) {
      this.atorFormGroup.markAllAsTouched();
      return;
    } else {
      this.Atores = this.createAtor();

      this.atorService.update(this.Atores, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'atores']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
