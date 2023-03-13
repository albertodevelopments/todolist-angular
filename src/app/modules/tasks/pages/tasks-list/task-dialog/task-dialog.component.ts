/** Angular core */
import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { AuthenticationService } from '@modules/authentication';

/** App imports */
import { iTask, iTaskOutputMessage, TaskComponent } from '@modules/tasks';

/** Librerías */
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  providers: [DialogService]
})
export class TaskDialogComponent implements OnDestroy, OnInit {

  @Input() currentTask: iTask | null
  @Output() showModal: EventEmitter<boolean>
  @Output() getTasks: EventEmitter<string>
  @Output() resetToFirstPage: EventEmitter<any>
  @Output() showMessage: EventEmitter<iTaskOutputMessage>

  public ref: DynamicDialogRef | null
  private _userId: string

  constructor(
    public dialogService: DialogService,
    private authenticationService: AuthenticationService    
  ){
    this.currentTask = null
    this.showModal = new EventEmitter<boolean>()
    this.getTasks = new EventEmitter<string>()
    this.resetToFirstPage = new EventEmitter<any>()
    this.showMessage = new EventEmitter<iTaskOutputMessage>() 
    this.ref = null   
    this._userId = ''
  }

  ngOnInit(): void {
    this.ref = this.dialogService.open(TaskComponent, {
      width: '40%',
      data: {
        currentTask: this.currentTask
      },
      header: 'Task detail',
      baseZIndex: 10000,
      maximizable: false
    });

    this.ref.onClose.subscribe({
      next: taskOutputMessage => {
        if (taskOutputMessage){
          this.authenticationService.userId$.subscribe({
            next: userId => {
              if (taskOutputMessage.type === 'Success'){
                if(taskOutputMessage.taskCreated){
                  this.showMessage.emit(taskOutputMessage)
                  this.getTasks.emit(userId)
                  this.resetToFirstPage.emit(taskOutputMessage.event)
                }
              }else{
                this.showMessage.emit(taskOutputMessage)
              }
            },
            error: () => {
              const message: iTaskOutputMessage = {
                type: 'Error',
                message: 'Oops... something went wrong retrieving the user id!'
              } as iTaskOutputMessage
              this.showMessage.emit(message)
            }
          })
        }        
        this.showModal.emit(false)
      }
    })
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}

