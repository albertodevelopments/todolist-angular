/** Angular core */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/** App imports */
import { User, AuthenticationService, passwordsMustMatchValidator } from '@modules/authentication';
import { errorsHandler, iErrorResponse } from '@shared/index';

/** Librerías */
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent {
  public signupForm: FormGroup
  public signUpErrorMessage: any

  constructor(
    private formBuilderService: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ){
    this.signupForm = this.formBuilderService.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])      
    }, {validators: passwordsMustMatchValidator})

    this.signUpErrorMessage = ''
  }

  /** Getters para poder acceder a los valores del formulario */
  get name(): FormControl{
    return this.signupForm.get('name') as FormControl
  }
  get email(): FormControl{
    return this.signupForm.get('email') as FormControl
  }
  get password(): FormControl{
    return this.signupForm.get('password') as FormControl
  }
  get confirmPassword(): FormControl{
    return this.signupForm.get('confirmPassword') as FormControl
  }

  async signup(){
    this.signupForm.markAsPending()
    const user = new User({
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    })

      const response = await this.authenticationService.signup(user)
      console.log(response)
      switch(response){
        case '':
          this.handleSuccess()
          break
        case 'auth/email-already-in-use':
          this.handleError(400)
          break
        default:
          this.handleError(0)
          break
      }
  }

  private handleError(errorCode: number): void{
    this.signupForm.setErrors({requestResponseError: true})
    this.signUpErrorMessage = errorsHandler(errorCode)

    this.showErrorMessage(this.signUpErrorMessage)
  }

  private handleSuccess(): void{
    this.router.navigate(['/tasks-list'])
  }

  private showErrorMessage(errorMessage: iErrorResponse){
    this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage.description});
  }

  goLogin(): void{
    this.router.navigate(['login'])
  }
}
