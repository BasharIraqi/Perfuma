export interface BankAccount {
    accountNumber: number;
    id: number;
    firstName: string;
    lastName: string;
    bankName: BankCompany;
    bankBranchNumber: number;
}

enum BankCompany {
    Leumi,
    Boalim,
    Discont,
    Masad,
    Mezrahi,
    Yahav,
}