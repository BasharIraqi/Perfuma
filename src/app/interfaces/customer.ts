import { Address } from "./address";
import { CreditCard } from "./creditCard";
import { Order } from "./order";
import { User } from "./user";

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    orders: Order[];
    email: string;
    phone: number; 
    address: Address;
    payment:CreditCard;
    user:User;
    
}