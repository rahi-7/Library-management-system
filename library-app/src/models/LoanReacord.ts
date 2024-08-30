import { Book } from "./Book";

export type LoanRecord = {
    _id: string;
    status: "LOANED" | "AVAILABLE";
    loanedDate: Date;
    dueDate: Date;
    returnedDate?: Date;
    item: Book;
    employeeOut: string;
    employeeIn?: string;
    patron: string;
    createdAt: Date;
    updatedAt:Date;
}