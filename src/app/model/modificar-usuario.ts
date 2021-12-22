export class ModificarUsuario {

    email: string;
    dni: string;
    password: string;

    constructor(Email:string, Dni:string, Password:string){
        this.email = Email;
        this.dni = Dni;
        this.password = Password;
    }
}
