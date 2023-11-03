
export interface User {
    _id:string,
    name:string,
    email:string,
    password:string,
    createdAt:Date
}

export interface Userss {
    id:string
    name:string
    job:string
    company:string
    location:string
    favColor:string
};

export interface bUser {
    name:string,
    email:string,
    password:string,
}

export interface loginUser {
    name:string,
    password:string,
}

export interface tokenData {
    name:string,
    token:string,
}