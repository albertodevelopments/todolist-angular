import { iErrorResponse } from '@shared/index';

export function errorsHandler(errorCode: number){
    let errorResponse: iErrorResponse = {
        code: errorCode,
        description: ''
    }

    switch(errorCode){
        case 400:
            errorResponse.description = 'This account is already in use!'
            break
        case 4000:
            errorResponse.description = 'Task already created! Try another description'
            break    
        case 401:
            errorResponse.description = 'Sorry, you are not in. Sign up!'
            break
        default:
            errorResponse.description = 'Oops... something went wrong'
            break
    }

    return errorResponse
}