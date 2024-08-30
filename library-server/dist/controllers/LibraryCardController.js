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
const LibraryCardService_1 = require("../services/LibraryCardService");
const libraryErrors_1 = require("../utils/libraryErrors");
function getLibraryCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId } = req.params;
        try {
            const libraryCard = yield (0, LibraryCardService_1.findLibraryCard)(cardId);
            res.status(200).json({ message: "card retrieved successsfully", libraryCard });
        }
        catch (error) {
            if (error instanceof libraryErrors_1.LibraryCardDoesNotExistError) {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: "server error", error: error.message });
            }
        }
    });
}
function createLibraryCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = req.body;
        try {
            const libraryCard = yield (0, LibraryCardService_1.registerLibraryCard)(card);
            res.status(201).json({ message: "card successfullly created", libraryCard: libraryCard });
        }
        catch (err) {
            res.status(500).json({ message: "unable to create card", error: err.message });
        }
    });
}
exports.default = { getLibraryCard, createLibraryCard };
