import { iTaskOutputMessage } from "../interfaces/itask-output-message";

export class TaskOutputMessage implements iTaskOutputMessage{

    private taskOutputMessage: iTaskOutputMessage

    constructor(taskOutputMessage: iTaskOutputMessage){
        this.taskOutputMessage = taskOutputMessage
    }

    get type(): string{
        return this.taskOutputMessage.type
    }

    get taskCreated(): boolean{
        return this.taskOutputMessage.taskCreated
    }

    get message(): string{
        return this.taskOutputMessage.message
    }

    get event(): Event{
        return this.taskOutputMessage.event
    }
}
