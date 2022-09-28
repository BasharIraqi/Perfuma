export interface CreditCard {
    id:number;
    number: number;
    firstName: string;
    lastName: string;
    cvv: number;
    expiredMonth: string;
    expiredYear:string;
    numberOfPayments: number;
}