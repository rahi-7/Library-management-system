import { Response, Request } from "express";
import { findAllRecords, generateRecord, modifyRecord, queryRecords } from "../services/LoanRecoadService";
import { LoanRecordDoesNotExistError } from "../utils/libraryErrors";

async function createRecord(req:Request, res:Response) {
    const record = req.body

    try {
        const createdRecord = await generateRecord(record)
        res.status(201).json({message:"record successfullly created", record:createdRecord})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
}

async function updateRecord(req:Request, res:Response) {
    const record = req.body

    try {
        const updatedRecord = await modifyRecord(record)
        res.status(201).json({message:"record successfullly updated", record:updatedRecord})
    } catch (error) {
        if (error instanceof LoanRecordDoesNotExistError) {
            res.status(404).json({message:"record does not exist hence unable to be modified", error:error.message})
        } else {
            res.status(500).json({message:"something went wrong", error})
        }
    }
}

async function getAllRecords(req:Request, res:Response) {
    try {
        const records = await findAllRecords()
        res.status(200).json({message:"retrived all records", records})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
}

async function getRecordByProperty(req:Request, res:Response) {
    const params = req.body

    try {
        const records = await queryRecords(params)
        res.status(200).json({message:"retrived records from your query", records})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error})
    }
}

export {createRecord, updateRecord, getAllRecords, getRecordByProperty}