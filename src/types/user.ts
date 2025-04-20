


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}