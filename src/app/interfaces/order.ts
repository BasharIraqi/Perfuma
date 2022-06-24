import {Customer} from './Customer';
import { Product } from "./product";

export interface Order {
    id: number;
    customer:Customer;
    products: Product[];
    numberOfProducts: number;
    totalPrice: number;
    orderDate: Date;
    deliveryDate: Date;
}