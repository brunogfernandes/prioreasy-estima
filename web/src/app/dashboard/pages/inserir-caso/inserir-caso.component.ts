import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { casoUso } from '../../models/casoUso';
import { CasoUsoService } from '../../services/casoUso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-inserir-caso',
  templateUrl: './inserir-caso.component.html',
  styleUrls: ['./inserir-caso.component.css']
})
export class InserirCasoComponent {

  casoFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;
  requisitoId!: number;

  casoUso!: casoUso;

  constructor(
    private projetoService: ProjetoService,
    private casoUsoService: CasoUsoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['idPro'];
    this.requisitoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.casoFormGroup = this.formBuilder.group({

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

  backToCasoHome(){
    this.router.navigate(['dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get nome() {
    return this.casoFormGroup.get('nome');
  }
  get complexidade() {
    return this.casoFormGroup.get('complexidade');
  }
  get descricao() {
    return this.casoFormGroup.get('descricao');
  }

  createCaso(): casoUso {
    return new casoUso(
      this.nome?.value,
      this.complexidade?.value,
      this.descricao?.value
    );
  }

  onSubmit() {
    if (this.casoFormGroup.invalid) {
      this.casoFormGroup.markAllAsTouched();
      return;
    } else {
      this.casoUso = this.createCaso();
      console.log(this.casoUso);

      this.casoUsoService.create(this.casoUso, this.requisitoId).subscribe({
        next: () => {
          this.router.navigate(['dashboard/projeto/', this.projetoId, 'requisitos', this.requisitoId, 'caso-de-uso']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
