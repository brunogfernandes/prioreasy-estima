import { Component } from '@angular/core';
import { StakeholderSignin } from '../../models/stakeholder-signin';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stakeholder-signin',
  templateUrl: './stakeholder-signin.component.html',
  styleUrls: ['./stakeholder-signin.component.css']
})
export class StakeholderSigninComponent {
  signinFormGroup!: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.signinFormGroup = this.formBuilder.group({
      chave: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),

      senha: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
    });
  }

  get chave() { return this.signinFormGroup.get('chave'); }
  get senha() { return this.signinFormGroup.get('senha'); }

  private createUser(): StakeholderSignin {
    return new StakeholderSignin(
      this.chave!.value,
      this.senha!.value
    )
  }

  onSubmit(): void {

    if (this.signinFormGroup.invalid){

      this.signinFormGroup.markAllAsTouched();
      return;

    } else {

      const signinUser = this.createUser();

      this.authService.signinStakeholder(signinUser).subscribe({

        next: (response) => {
          console.log(response)
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('usu_email', response.usu_email);
          localStorage.setItem('usu_name', response.usu_name);
          localStorage.setItem('usu_id', response.usu_id);
          localStorage.setItem('usu_role', response.usu_role);
          this.router.navigate(['/dashboard']);
        },

        error: err => {
          alert(err.error.message)
        }

      });

    }

  }
}
