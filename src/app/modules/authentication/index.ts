/** Angular core */
export { AuthenticationRoutingModule } from './authentication-routing.module'
export { AuthenticationModule } from './authentication.module'

/** Componentes  */
export { LoginComponent } from './pages/login/login.component'
export { SignupComponent } from './pages/signup/signup.component'

/** Modelo */
export { User } from './models/user'
export { iUser } from './interfaces/iuser'
export { iErrorResponse } from '@shared/index'

/** Servicios */
export { AuthenticationService } from '@modules/authentication/services/authentication.service'

/** Shared */
export { passwordsMustMatchValidator } from './shared/passwords-match.validator'

