import express from "express"
import { createRecord, getAllRecords, getRecordByProperty, updateRecord } from "../controllers/LoanRecordController"
import { Schemas, ValidateSchema } from '../middlewares/Validation'

const router = express.Router()

router.get("/", getAllRecords)
router.post("/", ValidateSchema(Schemas.loan.create, "body"), createRecord)
router.put("/", ValidateSchema(Schemas.loan.update, "body"), updateRecord)
router.post("/query", ValidateSchema(Schemas.loan.query, "body"), getRecordByProperty)

export = router
