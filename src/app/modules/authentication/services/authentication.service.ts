/** Angular core */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

/** App imports */
import { iUser } from '@modules/authentication'
import { auth } from '@core/index'

/** Firebase */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userId: BehaviorSubject<string>
  public userId$: Observable<string>

  constructor(
  ) {
    this._userId = new BehaviorSubject<string>('')
    this.userId$ = this._userId.asObservable()    
  }

  async signup(userCredentials: iUser): Promise<string>{

    try{
      const response = await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      this._userId.next(response.user.uid)
      this.saveInLocalStorage(response.user.uid)

      return ''
    } catch(error: any){
      return error.code
    }

  }

  async login(userCredentials: iUser): Promise<string> {
    try {
      const response = await signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
      this._userId.next(response.user.uid)
      this.saveInLocalStorage(response.user.uid)

      return ''
    } catch (error: any) {
      return error.code
    }
  }

  signout(): void{
    this._userId.next('')
    this.removeFromLocalStorage()
  }

  saveInLocalStorage(userId: string): void{
    localStorage.setItem('todo-userid', userId)
  }

  removeFromLocalStorage(): void{
    localStorage.removeItem('todo-userid')
  }

  isAuthenticated(): boolean{
    const userId = localStorage.getItem('todo-userid')

    return userId !== null && userId !== ''
  }
}
