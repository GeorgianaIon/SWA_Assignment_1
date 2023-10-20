export interface GameModel {
    id: number,
    user: number,
    score: number,
    completed: boolean
}

export interface UserModel {
    username: string,
    password: string,
    id : number,
    admin: boolean 
}

export interface LoginModel {
    token: string 
    userId : number,
}