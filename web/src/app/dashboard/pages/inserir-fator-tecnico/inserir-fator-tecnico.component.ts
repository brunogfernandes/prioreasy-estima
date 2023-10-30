import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Projeto } from '../../models/projeto';
import { fatTecPro } from '../../models/fatTecPro';
import { ProjetoService } from '../../services/projeto.service';
import { FatTecProService } from '../../services/fatTecPro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inserir-fator-tecnico',
  templateUrl: './inserir-fator-tecnico.component.html',
  styleUrls: ['./inserir-fator-tecnico.component.css']
})
export class InserirFatorTecnicoComponent {

  FatorFormGroup!: FormGroup;
  projeto!: Projeto;
  projetoId!: number;
  userId!: number;

  fatTec!: fatTecPro;

  constructor(
    private projetoService: ProjetoService,
    private fatorService: FatTecProService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.FatorFormGroup = this.formBuilder.group({

      fatorTec: new FormControl('', [
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
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'fatores-tecnicos']);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  get fatorTec() {
    return this.FatorFormGroup.get('fatorTec');
  }
  get valor() {
    return this.FatorFormGroup.get('valor');
  }

  createFator(): fatTecPro {
    return new fatTecPro(

      this.valor?.value,
      this.fatorTec?.value,
      this.projetoId

    );
  }

  onSubmit() {
    if (this.FatorFormGroup.invalid) {
      this.FatorFormGroup.markAllAsTouched();
      return;
    } else {
      this.fatTec = this.createFator();
      console.log(this.fatTec);

      this.fatorService.create(this.fatTec, this.projetoId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'fatores-tecnicos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
