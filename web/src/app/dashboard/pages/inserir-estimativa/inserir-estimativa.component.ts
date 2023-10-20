import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Projeto } from '../../models/projeto';
import { Estimativa } from '../../shared/models/estimativa';
import { ProjetoService } from '../../services/projeto.service';
import { EstimativaService } from '../../services/estimativa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inserir-estimativa',
  templateUrl: './inserir-estimativa.component.html',
  styleUrls: ['./inserir-estimativa.component.css']
})
export class InserirEstimativaComponent {

  EstimativaFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;

  estimativa!: Estimativa;

  constructor(
    private projetoService: ProjetoService,
    private estimativaService: EstimativaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.EstimativaFormGroup = this.formBuilder.group({

      Efactor: new FormControl('', [
        Validators.required,
      ]),
      Tfactor: new FormControl('', [
        Validators.required,
      ]),
      PesoCaso: new FormControl('', [
        Validators.required,
      ]),
      PesoAtor: new FormControl('', [
        Validators.required,
      ]),
      PesoPontos: new FormControl('', [
        Validators.required,
      ]),
      ResPontos: new FormControl('', [
        Validators.required,
      ]),
      ResHoras: new FormControl('', [
        Validators.required,
      ]),

    });

    this.buscarProjeto(this.projetoId, this.userId);
  }

  backToEstimativaHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'estimativa']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get Efactor() {
    return this.EstimativaFormGroup.get('Efactor');
  }
  get Tfactor() {
    return this.EstimativaFormGroup.get('Tfactor');
  }
  get PesoCaso() {
    return this.EstimativaFormGroup.get('PesoCaso');
  }
  get PesoAtor() {
    return this.EstimativaFormGroup.get('PesoAtor');
  }
  get PesoPontos() {
    return this.EstimativaFormGroup.get('PesoPontos');
  }
  get ResPontos() {
    return this.EstimativaFormGroup.get('ResPontos');
  }
  get ResHoras() {
    return this.EstimativaFormGroup.get('ResHoras');
  }

  createEstimativa(): Estimativa {
    return new Estimativa(
      this.Efactor?.value,
      this.Tfactor?.value,
      this.PesoCaso?.value,
      this.PesoAtor?.value,
      this.PesoPontos?.value,
      this.ResPontos?.value,
      this.ResHoras?.value,
    );
  }

  onSubmit() {
    if (this.EstimativaFormGroup.invalid) {
      this.EstimativaFormGroup.markAllAsTouched();
      return;
    } else {
      this.estimativa = this.createEstimativa();
      console.log(this.estimativa);

      this.estimativaService.create(this.estimativa, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'estimativa']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
