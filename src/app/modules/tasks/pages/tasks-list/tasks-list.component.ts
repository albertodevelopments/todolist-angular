/** Angular core */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@modules/authentication';

/** App imports */
import { iTask } from '@modules/tasks/interfaces/itask';
import { iTaskOutputMessage } from '@modules/tasks/interfaces/itask-output-message';
import { TasksService } from '@modules/tasks/services/tasks.service';
import { errorsHandler, iErrorResponse } from '@shared/index';

/** Librerías */
import { MessageService, ConfirmationService } from 'primeng/api'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TasksListComponent implements OnInit{

  @ViewChild ('paginator', {static: false}) paginator: any

  public dialogShown: boolean
  public tasksList: iTask[]
  public currentTask: iTask | null
  public firstPage: number
  public loading: boolean
  private _userId: string
  public totalRecords: number
  protected linesPerPage: number  

  constructor(
    private tasksService: TasksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.dialogShown = false
    this.tasksList = []
    this.currentTask = null
    this.firstPage = 0
    this.loading = false
    this._userId = ''
    this.totalRecords = 0    
    this.linesPerPage = this.tasksService.getLinesPerPage()
  }

  ngOnInit(): void {
    this.authenticationService.userId$.subscribe(userId => {
      this._userId = userId
      this._userId && this._userId !== '' && this.getTasks(0, this._userId)
    })    
  }

  async getTasks(page: number, userId: string){
    this.loading = true
    try {
      const count = await this.tasksService.count(userId)
      
      this.tasksList = await this.tasksService.getTasks(page, userId)
      this.loading = false
      this.totalRecords = count
      this.firstPage = 0
      
    } catch (error) {
      console.log(error)
    }
  }

  resetToFirstPage($event: any): void{
    this.paginator.changePageToFirst($event)
  }

  addTask(){
    this.toggleModalDialog(true)
    this.currentTask = null
  }

  editTask(task: iTask){
    this.toggleModalDialog(true)
    this.currentTask = task
  }

  async toggleCompleteTask(task: iTask): Promise<void>{
    const currentTask: iTask = {
      ...task,
      completed: !task.completed,
    }

    const response = await this.tasksService.update(currentTask) 
    if(response !== ''){
      this.handleError(0)
    }else{
      this._userId && this._userId !== '' && this.getTasks(0, this._userId)
    }
  }

  private async deleteTask(currentTask: iTask, event: Event){
    const response = await this.tasksService.delete(currentTask)
    if(response !== ''){
      this.handleError(0)
    }else{
      this.handleSuccess() 
      this._userId && this._userId !== '' && this.getTasks(0, this._userId)
      this.resetToFirstPage(event)
    }
  }

  private handleError(errorCode: number): void{
    const taskErrorMessage: iErrorResponse = errorsHandler(errorCode)

    const outputMessage: iTaskOutputMessage = {
      type: 'Error',
      taskCreated: false,
      message: taskErrorMessage.description,
      event: new Event('')
    }

    this.showMessage(outputMessage)
  }

  toggleModalDialog(shown: boolean): void {
    this.dialogShown = shown
  }

  confirmDelete(task: iTask, event: Event) {
    this.confirmationService.confirm({
        message: 'Sure that you want to delete this task?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => this.deleteTask(task, event),
    });
  }

  paginate(pageObject: any){
    this._userId && this._userId !== '' && this.getTasks(pageObject.page, this._userId)  
  }

  showMessage(taskOutputMessage: iTaskOutputMessage){
    this.messageService.add({severity: taskOutputMessage.type.toLowerCase(), summary: taskOutputMessage.type, detail: taskOutputMessage.message});
  }

  private handleSuccess(){
    const outputMessage: iTaskOutputMessage = {
      type: 'Success',
      taskCreated: true,
      message: 'Task removed successfully!',
      event: new Event('')
    }

    this.showMessage(outputMessage)    
  }

  signout(){
    this.authenticationService.signout()
    this.router.navigate(['login'])
  }
}
