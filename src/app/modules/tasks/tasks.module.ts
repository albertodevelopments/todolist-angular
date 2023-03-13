/** Angular core */
import { NgModule } from '@angular/core';
import { TasksRoutingModule } from './tasks-routing.module'

/** App imports */
import { TasksListComponent, TaskComponent, TaskDialogComponent } from '@modules/tasks'
import { SharedModule } from '@shared/index'

@NgModule({
  declarations: [
    TasksListComponent,
    TaskDialogComponent,
    TaskComponent    
  ],
  imports: [
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
