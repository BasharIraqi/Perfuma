import { Customer } from "./customer";
import { Product } from "./product";

export interface Order {
    id: number;
    customer:Customer;
    products: Product[];
    numberOfProducts: number;
    orderDate: string | null;
    arrivalDate: string | null;
    paymentValue:number;
};



