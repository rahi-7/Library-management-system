"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = createRecord;
exports.updateRecord = updateRecord;
exports.getAllRecords = getAllRecords;
exports.getRecordByProperty = getRecordByProperty;
const LoanRecoadService_1 = require("../services/LoanRecoadService");
const libraryErrors_1 = require("../utils/libraryErrors");
function createRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = req.body;
        try {
            const createdRecord = yield (0, LoanRecoadService_1.generateRecord)(record);
            res.status(201).json({ message: "record successfullly created", record: createdRecord });
        }
        catch (error) {
            res.status(500).json({ message: "something went wrong", error });
        }
    });
}
function updateRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = req.body;
        try {
            const updatedRecord = yield (0, LoanRecoadService_1.modifyRecord)(record);
            res.status(201).json({ message: "record successfullly updated", record: updatedRecord });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.LoanRecordDoesNotExistError) {
                res.status(404).json({ message: "record does not exist hence unable to be modified", error: error.message });
            }
            else {
                res.status(500).json({ message: "something went wrong", error });
            }
        }
    });
}
function getAllRecords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const records = yield (0, LoanRecoadService_1.findAllRecords)();
            res.status(200).json({ message: "retrived all records", records });
        }
        catch (error) {
            res.status(500).json({ message: "something went wrong", error });
        }
    });
}
function getRecordByProperty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.body;
        try {
            const records = yield (0, LoanRecoadService_1.queryRecords)(params);
            res.status(200).json({ message: "retrived records from your query", records });
        }
        catch (error) {
            res.status(500).json({ message: "something went wrong", error });
        }
    });
}
