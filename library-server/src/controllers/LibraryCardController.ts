import { Request, Response } from "express";
import { ILibraryCard } from "../models/LibraryCard";
import { registerLibraryCard, findLibraryCard } from "../services/LibraryCardService";
import { LibraryCardDoesNotExistError } from "../utils/libraryErrors";

async function getLibraryCard(req:Request, res:Response) {
    const {cardId} = req.params
    try {
        const libraryCard = await findLibraryCard(cardId)
        res.status(200).json({message:"card retrieved successsfully",libraryCard})
    } catch(error:any) {
        if(error instanceof LibraryCardDoesNotExistError) {
            res.status(404).json({message:error.message})
        } else {
            res.status(500).json({message:"server error",error:error.message})
        }
    }
}

async function createLibraryCard(req:Request, res:Response) {
    const card:ILibraryCard = req.body

    try {
        const libraryCard = await registerLibraryCard(card)
        res.status(201).json({message:"card successfullly created",libraryCard:libraryCard})
    } catch (err:any) {
        res.status(500).json({message:"unable to create card",error:err.message})
    }
}


export default {getLibraryCard, createLibraryCard}