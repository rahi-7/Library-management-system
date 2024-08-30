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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLibraryCard = registerLibraryCard;
exports.findLibraryCard = findLibraryCard;
const LibraryCardDao_1 = __importDefault(require("../daos/LibraryCardDao"));
const libraryErrors_1 = require("../utils/libraryErrors");
function registerLibraryCard(card) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedCard = new LibraryCardDao_1.default(card);
            return yield savedCard.save();
        }
        catch (err) {
            let c = yield LibraryCardDao_1.default.findOne({ user: card.user }).populate("user");
            if (c)
                return c;
            throw new Error(err);
        }
    });
}
function findLibraryCard(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const card = yield LibraryCardDao_1.default.findOne({ _id: userId }).populate("user");
            if (card)
                return card;
            throw new libraryErrors_1.LibraryCardDoesNotExistError("The library card specified does not exist");
        }
        catch (err) {
            if (err instanceof libraryErrors_1.LibraryCardDoesNotExistError)
                throw err;
            throw new Error("unknown error");
        }
    });
}
