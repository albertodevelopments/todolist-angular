import { iTask } from "@modules/tasks";

export class Task implements iTask{
    
    private task: iTask

    constructor(task: iTask){
        this.task = task
    }

    get userId(): string{
        return this.task.userId
    }

    get id(): string{
        return this.task.id
    }

    get description(): string{
        return this.task.description
    }

    get progress(): number{
        return this.task.progress
    }

    get completed(): boolean {
        return this.task.completed
    }
}
