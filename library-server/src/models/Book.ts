import { ILoanRecord } from "./LibraryRecord";

export interface IBook {
    barcode:string;
    cover:string;
    title:string;
    authors:string[];
    description:string;
    subjects:string[];
    publisher:string;
    publicationDate:Date;
    pages:number;
    genre:string;
    records: ILoanRecord[];
}