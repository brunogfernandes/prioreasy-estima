import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Projeto } from '../../models/projeto';
import { fatAmbPro } from '../../shared/models/fatAmbPro';
import { ProjetoService } from '../../services/projeto.service';
import { FatAmbProService } from '../../services/fatAmbPro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inserir-fator-ambiental',
  templateUrl: './inserir-fator-ambiental.component.html',
  styleUrls: ['./inserir-fator-ambiental.component.css']
})
export class InserirFatorAmbientalComponent {

  FatorFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;

  fatAmb!: fatAmbPro;

  constructor(
    private projetoService: ProjetoService,
    private fatorService: FatAmbProService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.FatorFormGroup = this.formBuilder.group({

      fatorAmb: new FormControl('', [
        Validators.required,
      ]),

      valor: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
      ]),
    });

    this.buscarProjeto(this.projetoId, this.userId);
  }

  backToFatorHome(){
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'fatores-ambientais']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get fatorAmb() {
    return this.FatorFormGroup.get('fatorAmb');
  }
  get valor() {
    return this.FatorFormGroup.get('valor');
  }

  createFator(): fatAmbPro {
    return new fatAmbPro(

      this.valor?.value,
      this.fatorAmb?.value,
      this.projetoId

    );
  }

  onSubmit() {
    if (this.FatorFormGroup.invalid) {
      this.FatorFormGroup.markAllAsTouched();
      return;
    } else {
      this.fatAmb = this.createFator();
      console.log(this.fatAmb);

      this.fatorService.create(this.fatAmb, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'fatores-ambientais']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
