export interface AuthBody {
    email: string
    password: string
}

export interface User {
    uid: string,
    email: string,
    passwordHash: string,
    createdAt: number,
    isAdmin: boolean
}