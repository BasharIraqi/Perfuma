export interface CreditCard {
    id:number;
    number: number;
    firstName: string;
    lastName: string;
    cvv: number;
    expiredMonth: number;
    expiredYear:number;
    numberOfPayments: number;
}