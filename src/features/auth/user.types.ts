interface UserTypes {
    id: string;
    username: string;
    email: string;
    password: string;
    toReadList: string[];
    whitelist: string[];
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}