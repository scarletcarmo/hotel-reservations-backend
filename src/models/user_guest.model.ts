import { User } from "./user.model";

export class UserGuest extends User {
    name: string;
    last_name: string;
    identification: string;
    phone: string;

    constructor(
        id: number,
        username: string,
        password: string,
        email: string,
        role_id: number,
        name: string,
        last_name: string,
        identification: string,
        phone: string
    ) {
        super(id, username, password, email, role_id);
        this.name = name;
        this.last_name = last_name;
        this.identification = identification;
        this.phone = phone;
    }
}
