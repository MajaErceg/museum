import { Obilazak } from "./obilazak";

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string| undefined;
    phone: string| undefined;
    address: string| undefined;
    obilazak:Array<Obilazak>;
    favorites: Array<Object>;
    token: string;
}