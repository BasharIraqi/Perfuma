import { Order } from "./order";

export interface Product {
    barcode: number;
    name: string;
    stock: number;
    isInStock: boolean;
    imageUrl: string;
    price: number;
    description: string;
    category: number;
    review:string;
    orders:Order[];
}