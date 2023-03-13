/** Angular core */
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/** App imports */

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  { 
    path: '', 
    loadChildren: () => import('../modules/authentication/authentication.module').then(m => m.AuthenticationModule) 
  },
  {
    path: '',
    loadChildren: () => import('../modules/tasks/tasks.module').then(m => m.TasksModule)
  },  
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
