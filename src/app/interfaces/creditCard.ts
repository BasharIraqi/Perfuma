export interface CreditCard {
    number: number;
    firstName: string;
    lastName: string;
    cvv: number;
    expiredDate: Date;
    numberOfPayments: number;
}