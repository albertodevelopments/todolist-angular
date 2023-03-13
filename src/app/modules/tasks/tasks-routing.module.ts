/** Angular core */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@core/guards/is-authenticated.guard';

/** App imports */
import { TaskComponent } from './pages/task/task.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';

const routes: Routes = [
  {path: 'tasks-list', component: TasksListComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'task', component: TaskComponent, canActivate: [IsAuthenticatedGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
