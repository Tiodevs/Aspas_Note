export enum Role {
    ADMIN = 'ADMIN',
    FREE = 'FREE',
    PRO = 'PRO',
}

export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    password: string;
    role: Role;
}

