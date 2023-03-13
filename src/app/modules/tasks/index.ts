/** Angular core */
export { TasksModule } from '@modules/tasks/tasks.module'
export { TasksRoutingModule } from '@modules/tasks/tasks-routing.module'

/** Componentes  */
export { TaskComponent } from '@modules/tasks/pages/task/task.component'
export { TasksListComponent } from '@modules/tasks/pages/tasks-list/tasks-list.component'
export { TaskDialogComponent } from '@modules/tasks/pages/tasks-list/task-dialog/task-dialog.component'

/** Modelo */
export { Task } from './models/task'
export { iTask } from './interfaces/itask'
export { iTaskOutputMessage } from './interfaces/itask-output-message'
export { TaskOutputMessage} from './models/task-output-message'

/** Servicios */
export { TasksService } from './services/tasks.service'