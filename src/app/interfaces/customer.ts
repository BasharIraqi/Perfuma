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
    phoneNumber: string; 
    address: Address;
    creditCard:CreditCard;
    user:User;
};