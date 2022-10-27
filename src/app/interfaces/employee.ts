import { Address } from "./address";
import { BankAccount } from "./bankAccount";
import { User } from "./user";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phoneNumber: string;
    birthDay:string;
    birthMonth:string;
    birthYear:string;
    startedDay:string;
    startedMonth:string;
    startedYear:string;
    bankAccount: BankAccount;
    salaryPerHour: number;
    seniority: number;
    isActivated: boolean;
    jobType: JopType;
    address: Address;
    user:User;
}

enum JopType {
    Director,
    Manager,
    General
}