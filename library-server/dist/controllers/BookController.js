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
const BookService_1 = require("../services/BookService");
const libraryErrors_1 = require("../utils/libraryErrors");
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, BookService_1.findAllBooks)();
            res.status(200).json({ message: "books retrieved successsfully", count: books.length, books });
        }
        catch (err) {
            res.status(500).json({ message: "unable to retrieve books", error: err.message });
        }
    });
}
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = req.body;
        try {
            const savedBook = yield (0, BookService_1.registerBook)(book);
            res.status(201).json({ message: "book successfullly created", book: savedBook });
        }
        catch (err) {
            if (err.message.includes("E11000 duplicate key error collection")) {
                res.status(409).json({ message: "Book with this barcode already exists", error: err.message });
            }
            else {
                res.status(500).json({ message: "unable to create a book at this time", error: err.message });
            }
        }
    });
}
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = req.body;
        try {
            const updatedBook = yield (0, BookService_1.modifyBook)(book);
            res.status(202).json({ message: "book updated successfully", book: updatedBook });
        }
        catch (err) {
            if (err.message.includes("E11000 duplicate key error collection")) {
                res.status(409).json({ message: "Book with this barcode already exists", error: err.message });
            }
            else if (err instanceof libraryErrors_1.BookDoesNotExistError) {
                res.status(404).json({ message: "Book does not exist", error: err.message });
            }
            else {
                res.status(500).json({ message: "unable to update a book at this time", error: err.message });
            }
        }
    });
}
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const barcode = req.params.barcode;
        try {
            const deletedBook = yield (0, BookService_1.removeBook)(barcode);
            res.status(202).json({ message: "book deleted successfully", book: deletedBook });
        }
        catch (err) {
            if (err instanceof libraryErrors_1.BookDoesNotExistError) {
                res.status(404).json({ message: "Book does not exist", error: err.message });
            }
            else {
                res.status(500).json({ message: "unable to delete a book at this time", error: err.message });
            }
        }
    });
}
function searchForBooksByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { title, barcode, author, description, subject, genre, page = 1, limit = 25 } = req.query;
        try {
            const books = yield (0, BookService_1.queryBooks)(Number(page), Number(limit), title, barcode, description, author, subject, genre);
            res.status(200).json({ message: "books retrieved successsfully", page: books });
        }
        catch (err) {
            res.status(500).json({ message: "unable to retrieve books", error: err });
        }
    });
}
exports.default = { getAllBooks, createBook, updateBook, deleteBook, searchForBooksByQuery };
