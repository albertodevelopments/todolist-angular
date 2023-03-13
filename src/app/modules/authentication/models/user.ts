import { iUser } from "@modules/authentication";

export class User implements iUser{

    private user: iUser

    constructor(user: iUser){
        this.user = user
    }

    get email(): string{
        return this.user.email
    }

    get password(): string{
        return this.user.password
    }

    get name(): string{
        return this.user.name
    }
}
