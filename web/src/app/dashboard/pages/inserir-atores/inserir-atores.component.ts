import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Atores } from '../../shared/models/atores';
import { AtorService } from '../../services/ator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-inserir-atores',
  templateUrl: './inserir-atores.component.html',
  styleUrls: ['./inserir-atores.component.css']
})

export class InserirAtoresComponent {

  atorFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;

  atores!: Atores;

  constructor(
    private projetoService: ProjetoService,
    private atorService: AtorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.atorFormGroup = this.formBuilder.group({

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      complexidade: new FormControl('', [
        Validators.required,
      ]),

      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
    });

    this.buscarProjeto(this.projetoId, this.userId);
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
      this.descricao?.value
    );
  }

  onSubmit() {
    if (this.atorFormGroup.invalid) {
      this.atorFormGroup.markAllAsTouched();
      return;
    } else {
      this.atores = this.createAtor();
      console.log(this.atores);

      this.atorService.create(this.atores, this.projetoId).subscribe({
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
