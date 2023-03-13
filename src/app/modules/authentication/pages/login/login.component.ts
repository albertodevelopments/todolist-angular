/** Angular core */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/** App imports */
import { User, AuthenticationService } from '@modules/authentication';
import { errorsHandler, iErrorResponse } from '@shared/index';

/** Librerías */
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  public loginForm: FormGroup
  public loginErrorMessage: any

  constructor(
    private formBuilderService: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ){
    this.loginForm = this.formBuilderService.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.loginErrorMessage = ''
  }

  /** Getters para poder acceder a los valores del formulario */
  get email(): FormControl{
    return this.loginForm.get('email') as FormControl
  }

  get password(): FormControl{
    return this.loginForm.get('password') as FormControl
  }

  async login(){
    this.loginForm.markAsPending()

    /** Construimos un objeto de tipo iUserCredentias */
    const user = new User({
      name: '',
      email: this.email.value,
      password: this.password.value
    })

    const response = await this.authenticationService.login(user)
    switch(response){
      case '':
        this.handleSuccess()
        break
      case 'auth/user-not-found':
        this.handleError(401)
        break
      default:
        this.handleError(0)
        break
    }
  }

  private handleError(errorCode: number): void{
    this.loginForm.setErrors({requestResponseError: true})
    this.loginErrorMessage = errorsHandler(errorCode)

    this.showErrorMessage(this.loginErrorMessage)
  }

  private handleSuccess(){
    this.router.navigate(['tasks-list'])
  }

  private showErrorMessage(errorMessage: iErrorResponse){
    this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage.description});
  }

  goSignUp(): void{
    this.router.navigate(['signup'])
  }

}
