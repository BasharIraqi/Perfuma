export interface BankAccount {
    accountNumber: number;
    ownerId: number;
    firstName: string;
    lastName: string;
    name: BankCompany;
    branchNumber: number;
}

enum BankCompany {
    Leumi,
    Boalim,
    Discont,
    Masad,
    Mezrahi,
    Yahav,
}