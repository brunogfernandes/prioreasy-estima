import { Component } from '@angular/core';
import { StakeholderService } from '../../services/stakeholder.service';
import { StakeholderSignup } from '../../models/stakeholderSignup';
import { Projeto } from '../../models/projeto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-inserir-stakeholder',
  templateUrl: './inserir-stakeholder.component.html',
  styleUrls: ['./inserir-stakeholder.component.css']
})
export class InserirStakeholderComponent {
  projetoId!: number;
  projeto!: Projeto;
  userId!: number;
  stakeholderFormGroup!: FormGroup;

  constructor(
    private stakeholderService: StakeholderService,
    private projetoService: ProjetoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.projetoId = this.route.snapshot.params['id'];
    this.userId = Number(localStorage.getItem('usu_id'));
  }

  ngOnInit(): void {
    this.stakeholderFormGroup = this.formBuilder.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),

      cargo: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),

      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      confirmarSenha: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
    });

    this.buscarProjeto(this.projetoId, this.userId);
  }

  buscarProjeto(id: number, user: number) {
    this.projetoService.findById(id, user).subscribe((projeto) => {
      this.projeto = projeto;
    });
  }

  backToPrioreasy(): void {
    this.router.navigate(['/dashboard/projeto/', this.projetoId, 'painel-prioreasy']);
  }

  get nome() {
    return this.stakeholderFormGroup.get('nome');
  }
  get email() {
    return this.stakeholderFormGroup.get('email');
  }
  get cargo() {
    return this.stakeholderFormGroup.get('cargo');
  }
  get senha() {
    return this.stakeholderFormGroup.get('senha');
  }
  get confirmarSenha() {
    return this.stakeholderFormGroup.get('confirmarSenha');
  }

  private createStakeholder(): StakeholderSignup {
    return new StakeholderSignup(
      this.nome!.value,
      this.email!.value,
      this.cargo!.value,
      this.senha!.value,
      this.confirmarSenha!.value,
      this.projetoId
    );
  }

  onSubmit(): void {
    if (this.stakeholderFormGroup.invalid) {
      this.stakeholderFormGroup.markAllAsTouched();
      return;
    } else {
      const signupStakeholder = this.createStakeholder();

      this.stakeholderService.create(signupStakeholder).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard/projeto/', this.projetoId, 'stakeholders']);
        },

        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
