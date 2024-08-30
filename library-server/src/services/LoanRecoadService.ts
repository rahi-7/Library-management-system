import LoanRecordDao, {ILoanRecordModel} from "../daos/LoanRecordDao";
import { findBookById, modifyBook } from "./BookService";
import { ILoanRecord } from "../models/LibraryRecord";
import { promises } from "dns";
import { LoanRecordDoesNotExistError } from "../utils/libraryErrors";

export async function generateRecord(record:ILoanRecord): Promise<ILoanRecordModel> {
    try {
        let createdRecord = new LoanRecordDao(record)
        createdRecord = await createdRecord.save()

        let book = await findBookById(record.item)
        let records = book.records

        records = [createdRecord, ...records]
        book.records = records
        await modifyBook(book)

        return createdRecord
    } catch (error:any) {
        throw error
    }
}

export async function modifyRecord(record:ILoanRecordModel):Promise<ILoanRecordModel> {
    try {
        let updatedRecord = await LoanRecordDao.findOneAndUpdate({_id: record._id}, record, {new:true})

        if (updatedRecord) {
            let book = await findBookById(record.item)
            let records = book.records

            records[0] = updatedRecord
            book.records = records

            await modifyBook(book)

            return updatedRecord
        }
        throw new LoanRecordDoesNotExistError("The record does not exist")
    } catch(err:any) {
        if (err instanceof LoanRecordDoesNotExistError) {
            throw err
        }
        throw new Error(err)
    }
}

export async function findAllRecords():Promise<ILoanRecordModel[]> {
    try {
        return await LoanRecordDao.find()
    } catch (err:any) {
        throw new Error(err.message)
    }
}

export async function queryRecords(params:{property:string, value:string | Date}):Promise<ILoanRecordModel[]> {
    try {
        return await LoanRecordDao.find({[params.property]: params.value}).populate("item").sort("-loanedDate")
    } catch (err) {
        throw err
    }
}