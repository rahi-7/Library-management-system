import Joi, {ObjectSchema} from "joi"
import { NextFunction, Response, Request } from "express"
import { IUser } from "../models/User"
import { IUserModel } from "../daos/UserDao"
import { IBook } from "../models/Book"
import { IBookModel } from "../daos/BookDao"
import { ILibraryCard } from "../models/LibraryCard"
import { ILoanRecord } from "../models/LibraryRecord"
import { ILoanRecordModel } from "../daos/LoanRecordDao"

export function ValidateSchema (schema:ObjectSchema, property:string) {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            switch(property) {
                case "query":
                    await schema.validateAsync(req.query)
                    break
                case "params":
                    await schema.validateAsync(req.params)
                    break
                default:
                    await schema.validateAsync(req.body)
                    break
            }
            next()
        } catch (error:any) {
            return res.status(422).json({message: "Object validation failed please include a valid object"})
        }
    }
}

export const Schemas = {
    user:{
        create:Joi.object<IUser>({
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().email().required(),
            type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            password:Joi.string().required()
        }),
        login: Joi.object<{email:string, password:string}>({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }),
        userId: Joi.object<{userId:string}>({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: Joi.object<IUserModel>({
            _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().email().required(),
            type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            password:Joi.string(),
            createdAt:Joi.date(),
            updatedAt:Joi.date()
        })
    },
    book: {
        create: Joi.object<IBook>({
            barcode:Joi.string().required(),
            cover:Joi.string().required(),
            title:Joi.string().required(),
            authors:Joi.array().required(),
            description:Joi.string().required(),
            subjects:Joi.array().required(),
            publisher:Joi.string().required(),
            publicationDate:Joi.date().required(),
            pages:Joi.number().required(),
            genre:Joi.string().required()
        }),
        update: Joi.object<IBookModel>({
            _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            barcode:Joi.string().required(),
            cover:Joi.string().required(),
            title:Joi.string().required(),
            authors:Joi.array().required(),
            description:Joi.string().required(),
            subjects:Joi.array().required(),
            publisher:Joi.string().required(),
            publicationDate:Joi.date().required(),
            pages:Joi.number().required(),
            genre:Joi.string().required()
        }),
        delete: Joi.object<{barcode:string}>({
            barcode:Joi.string().required()
        })
    },
    libraryCard: {
        create: Joi.object<ILibraryCard>({
            user:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get: Joi.object<{cardId:string}>({
            cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan: {
        create: Joi.object<ILoanRecord>({
            item:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            loanedDate:Joi.date().required(),
            dueDate:Joi.date().required(),
            patron:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn:Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
            returnedDate:Joi.date().allow(null),
            status:Joi.string().valid("AVAILABLE", "LOANED").required()
        }),
        update: Joi.object<ILoanRecordModel>({
            _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            loanedDate:Joi.date().required(),
            dueDate:Joi.date().required(),
            patron:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn:Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null),
            returnedDate:Joi.date().allow(null),
            status:Joi.string().valid("AVAILABLE", "LOANED").required()
        }),
        query: Joi.object<{property:string, value:string | Date}>({
            property:Joi.string().valid("_id", "status", "loanedDate", "dueDate", "returnedDate", "patron", "employeeOut", "employeeIn", "item").required(),
            value:Joi.alternatives().try(Joi.string(), Joi.date()).required()
        })
    }
}