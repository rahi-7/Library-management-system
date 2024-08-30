import { Request, Response } from "express";
import { IBook } from "../models/Book";
import { IBookModel } from "../daos/BookDao";
import { findAllBooks, registerBook, modifyBook, removeBook, queryBooks } from "../services/BookService";
import { BookDoesNotExistError } from "../utils/libraryErrors";

async function getAllBooks(req:Request, res:Response) {
    try {
        const books = await findAllBooks();
        res.status(200).json({message:"books retrieved successsfully", count: books.length,books});
    } catch (err:any) {
        res.status(500).json({message:"unable to retrieve books",error:err.message});
    }
}


async function createBook(req:Request, res:Response) {
    const book: IBook = req.body;
    try {
        const savedBook = await registerBook(book);
        res.status(201).json({message:"book successfullly created",book:savedBook});
    } catch (err:any) {
        if (err.message.includes("E11000 duplicate key error collection")) {
            res.status(409).json({ message: "Book with this barcode already exists",error:err.message });
        } else {
            res.status(500).json({message: "unable to create a book at this time", error:err.message});
        }
    }
}


async function updateBook(req:Request, res:Response) {
    const book: IBook = req.body;
    try {
        const updatedBook = await modifyBook(book);
        res.status(202).json({message:"book updated successfully",book:updatedBook});
    } catch (err:any) {
        if (err.message.includes("E11000 duplicate key error collection")) {
            res.status(409).json({ message: "Book with this barcode already exists",error:err.message });
        } else if (err instanceof BookDoesNotExistError){
            res.status(404).json({ message: "Book does not exist",error:err.message });
        } else {
            res.status(500).json({message: "unable to update a book at this time", error:err.message});
        }
    }
}


async function deleteBook(req:Request, res:Response) {
    const barcode = req.params.barcode;
    try {
        const deletedBook = await removeBook(barcode);
        res.status(202).json({message:"book deleted successfully",book:deletedBook});
    } catch (err:any) {
        if (err instanceof BookDoesNotExistError) {
            res.status(404).json({ message: "Book does not exist",error:err.message });
        } else {
            res.status(500).json({message: "unable to delete a book at this time", error:err.message});
        }
    }
}


async function searchForBooksByQuery(req:Request, res:Response) {
    let {title, barcode, author, description, subject, genre, page=1, limit=25} = req.query

    try {
        const books = await queryBooks(
            Number(page),
            Number(limit),
            title as string,
            barcode as string,
            description as string,
            author as string,
            subject as string,
            genre as string
        )

        res.status(200).json({message:"books retrieved successsfully", page: books});
    } catch(err) {
        res.status(500).json({message:"unable to retrieve books",error:err})
    }
}

export default {getAllBooks, createBook, updateBook, deleteBook, searchForBooksByQuery}