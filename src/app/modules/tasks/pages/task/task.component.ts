/** Angular core */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/** App imports */
import { AuthenticationService } from '@modules/authentication';
import { iTask, iTaskOutputMessage, Task, TaskOutputMessage, TasksService } from '@modules/tasks';
import { errorsHandler, iErrorResponse } from '@shared/index';

/** Librerías */
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService]
})
export class TaskComponent implements OnInit{

  public progress: number
  public taskForm: FormGroup
  private _userid: string
  public taskErrorMessage: any
  private _event: Event

  constructor(
    private formBuilderService: FormBuilder,
    private tasksService: TasksService,
    private authenticationService: AuthenticationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ){
    this.progress = 0
    this.taskForm = this.formBuilderService.group({
      description: new FormControl('', Validators.required),
      progress: new FormControl(0)
    })
    this._userid = ''
    /** Event al hacer clic en el botón guardar para propagarlo hasta el componente padre */
    this._event = new Event('')
  }

  ngOnInit(): void {
    this.authenticationService.userId$.subscribe(userId => this._userid = userId)
    if(this.config.data.currentTask){

      /** Cargamos en el formulario los valores de la tarea a editar */
      this.taskForm.patchValue({
        description: this.config.data.currentTask.description,
        progress: this.config.data.currentTask.progress,
      })
    }
  }

  /** Getters para poder acceder a los valores del formulario */
  get description(): FormControl{
    return this.taskForm.get('description') as FormControl
  }

  saveTask(){
    if(!this.config.data.currentTask){ /** No existe la tarea actual, así que es creación */
      this.createTask()
    }else{
      this.updateTask()
    }
  }

  async createTask(): Promise<void>{    
    /** Cargamos los datos de la tarea desde el formulario y le añadimos el userId */
    const newTask: iTask = {
      id: '',
      userId: this._userid,
      description: this.taskForm.value.description,
      progress: this.taskForm.value.progress,
      completed: false
    }
    const task: iTask = new Task(newTask)

    const retrievedTask: iTask | null = await this.tasksService.checkTaskAlreadyExists(task.description)

    if(retrievedTask){
      this.handleError(4000)
    }else{
      const response = await this.tasksService.create(task)      
      switch(response){
        case '':
          this.handleSuccess()
          break
        default:
          this.handleError(0)
          break
      }    
    }
  }

  async updateTask(): Promise<void>{
    /** Modificamos en la tarea actual los datos introducidos en el formulario */
    const currentTask: iTask = {
      ...this.config.data.currentTask,
      description: this.taskForm.value.description,
      progress: this.taskForm.value.progress
    }

    const retrievedTask: iTask | null = await this.tasksService.checkTaskAlreadyExists(currentTask.description)

    if(retrievedTask && retrievedTask.id !== currentTask.id){
      this.handleError(4000)
    }else{
      const response = await this.tasksService.update(currentTask) 
      switch(response){
        case '':
          this.handleSuccess()
          break
        default:
          this.handleError(0)
          break
      }    
    }
  }

  private handleError(errorCode: number): void{
    this.taskForm.setErrors({requestResponseError: true})
    this.taskErrorMessage = errorsHandler(errorCode)

    const outputMessage: iTaskOutputMessage = {
      type: 'Error',
      taskCreated: false,
      message: this.taskErrorMessage.description,
      event: new Event('')
    }
    this.ref.close(outputMessage)
  }

  /** Nos guardamos el evento emitido para propagarlo hasta la pantalla de lista de
   *  tareas. En ella, se llamará al método changeToFirstPage del componente paginator
   *  pasándole este event como argumento
   */
  getEvent($event: Event): void{
    this._event = $event    
  }

  private handleSuccess(){
    const outputMessage: iTaskOutputMessage = {
      type: 'Success',
      taskCreated: true,
      message: 'Task created successfully!',
      event: this._event
    }
    this.ref.close(outputMessage)
  }
}
