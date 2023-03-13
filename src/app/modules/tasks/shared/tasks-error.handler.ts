import { iAuthErrorResponse } from '@modules/authentication';

export function authErrorsHandler(){
    let errorResponse: iAuthErrorResponse = {
        'description': 'Oops... something went wrong'
    }

    return errorResponse
}