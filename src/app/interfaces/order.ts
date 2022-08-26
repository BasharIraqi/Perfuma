import {Customer} from './customer';
import { Product } from "./product";

export interface Order {
    id: number;
    customer:Customer;
    products: Product[];
    numberOfProducts: number;
    orderDate: Date;
    arrivalDate: Date;
    paymentValue: number;

}