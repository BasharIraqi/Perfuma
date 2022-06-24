export interface User {
    email: string;
    password: string;
    userType: UserTypes;
}

enum UserTypes {
    Admin,
    Manager,
    General,
    Guest
}