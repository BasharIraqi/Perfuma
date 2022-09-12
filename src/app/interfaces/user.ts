import { Image } from "./image";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    roles:number;
    image:Image;
}