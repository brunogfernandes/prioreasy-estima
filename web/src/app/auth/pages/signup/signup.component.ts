import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Colaborador } from '../../models/colaborador';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupFormGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signupFormGroup = this.formBuilder.group({
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

      cargo: new FormControl('', [Validators.required]),

      empresa: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
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
  }

  get nome() {
    return this.signupFormGroup.get('nome');
  }
  get email() {
    return this.signupFormGroup.get('email');
  }
  get cargo() {
    return this.signupFormGroup.get('cargo');
  }
  get empresa() {
    return this.signupFormGroup.get('empresa');
  }
  get senha() {
    return this.signupFormGroup.get('senha');
  }
  get confirmarSenha() {
    return this.signupFormGroup.get('confirmarSenha');
  }

  private createUser(): Colaborador {
    return new Colaborador(
      this.nome!.value,
      this.email!.value,
      this.empresa!.value,
      this.cargo!.value,
      this.senha!.value,
      this.confirmarSenha!.value
    );
  }

  onSubmit(): void {
    if (this.signupFormGroup.invalid) {
      this.signupFormGroup.markAllAsTouched();
      return;
    } else {
      const signupUser = this.createUser();

      this.authService.signup(signupUser).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/collaborator-signin']);
        },

        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
