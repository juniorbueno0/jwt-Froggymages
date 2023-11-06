
export interface Post {
    _id:string,
    title:string,
    description:string,
    createdBy:string,
    createdAt:Date
}

export interface basePost {
    title:string,
    description:string,
    createdBy:string
}