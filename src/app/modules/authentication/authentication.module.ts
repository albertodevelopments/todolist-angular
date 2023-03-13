/** Angular core */
import { NgModule } from '@angular/core'
import { AuthenticationRoutingModule } from './authentication-routing.module'

/** App imports */
import { SignupComponent, LoginComponent } from '@modules/authentication'
import { SharedModule } from '@shared/index'

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
