export interface IUser {
    type: "ADMIN" | "EMPLOYEE" | "PATRON";
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    createdAt?:Date;
    updatedAt?:Date;
}