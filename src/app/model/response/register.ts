export class RegisterRequest {

    email:string;
    firstname: string;
    lastname: string;
    fecha: string;
    dni: string;
    password: string;
    tel: string;

    constructor(Email: string, Firstname: string, Lastname: string, Fecha: string, Dni: string, Password: string, Tel: string){
        this.email = Email;
        this.firstname = Firstname;
        this.lastname = Lastname;
        this.fecha = Fecha;
        this.dni = Dni;
        this.password = Password;
        this.tel = Tel;
    }

}