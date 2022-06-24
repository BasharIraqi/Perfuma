import { Address } from "./address";
import { BankAccount } from "./bankAccount";
import { User } from "./user";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: number;
    birthDate: Date;
    startedDate: Date;
    endDate: Date;
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