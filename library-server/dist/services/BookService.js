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
exports.findAllBooks = findAllBooks;
exports.findBookById = findBookById;
exports.registerBook = registerBook;
exports.modifyBook = modifyBook;
exports.removeBook = removeBook;
exports.queryBooks = queryBooks;
exports.paginateBooks = paginateBooks;
const BookDao_1 = __importDefault(require("../daos/BookDao"));
const libraryErrors_1 = require("../utils/libraryErrors");
function findAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield BookDao_1.default.find();
    });
}
function findBookById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const singleBook = yield BookDao_1.default.findById(id);
            if (singleBook)
                return singleBook;
            throw new libraryErrors_1.BookDoesNotExistError("Item does not exist");
        }
        catch (err) {
            if (err instanceof libraryErrors_1.BookDoesNotExistError) {
                throw err;
            }
            else {
                throw new Error(err.message);
            }
        }
    });
}
function registerBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedBook = new BookDao_1.default(book);
            return yield savedBook.save();
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function modifyBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateBook = yield BookDao_1.default.findOneAndUpdate({ barcode: book.barcode }, book, { new: true });
            if (updateBook)
                return updateBook;
            throw new libraryErrors_1.BookDoesNotExistError("Item does not exist");
        }
        catch (err) {
            if (err instanceof libraryErrors_1.BookDoesNotExistError) {
                throw err;
            }
            else {
                throw new Error(err.message);
            }
        }
    });
}
function removeBook(barcode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield BookDao_1.default.findOneAndDelete({ barcode: barcode });
            if (id)
                return "suceesfully deleted the book";
            throw new libraryErrors_1.BookDoesNotExistError("The book you are trying to delete does not exist");
        }
        catch (err) {
            if (err instanceof libraryErrors_1.BookDoesNotExistError) {
                throw err;
            }
            else {
                throw new Error(err.message);
            }
        }
    });
}
function queryBooks(page, limit, title, barcode, description, author, subject, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        let books = yield BookDao_1.default.find();
        let filteredBooks = [];
        books.forEach((book) => {
            if (barcode) {
                if (book.barcode.toLowerCase().includes(barcode.toLowerCase()) && !filteredBooks.some(b => b["barcode"] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (title) {
                if (book.title.toLowerCase().includes(title.toLowerCase()) && !filteredBooks.some(b => b["barcode"] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (description) {
                if (book.description.toLowerCase().includes(description.toLowerCase()) && !filteredBooks.some(b => b["barcode"] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (author) {
                if (book.authors.some(a => a.toLowerCase().includes(author.toLowerCase())) && !filteredBooks.some(b => b["barcode"] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (subject) {
                if (book.subjects.some(a => a.toLowerCase().includes(subject.toLowerCase())) && !filteredBooks.some(b => b["barcode"] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (genre) {
                //come check this later
                //if (book.genre.toLowerCse() === genre.toLowerCase())
                if (book.genre.toLowerCase().includes(genre.toLowerCase()) && !filteredBooks.some(b => b["barcode"] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
        });
        return paginateBooks(filteredBooks, page, limit);
    });
}
function paginateBooks(books, page, limit) {
    let pageBooks = [];
    const pages = Math.ceil(books.length / Number(limit));
    if (Number(page) === pages) {
        const startPoint = (Number(page) - 1) * Number(limit);
        pageBooks = books.slice(startPoint);
    }
    else {
        const startPoint = (Number(page) - 1) * Number(limit);
        const endPoint = startPoint + Number(limit);
        pageBooks = books.slice(startPoint, endPoint);
    }
    const pageObject = {
        totalCount: books.length,
        currentPage: Number(page),
        totalPages: pages,
        limit: Number(limit),
        pageCount: pageBooks.length,
        items: pageBooks
    };
    return pageObject;
}
