import exp from "constants";
import LibraryCardDao, { ILibraryCardModel } from "../daos/LibraryCardDao";
import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistError } from "../utils/libraryErrors";


export async function registerLibraryCard(card:ILibraryCard):Promise<ILibraryCardModel> {
    try {
        const savedCard = new LibraryCardDao(card)
        return await savedCard.save()
    } catch (err:any) {
        let c = await LibraryCardDao.findOne({user: card.user}).populate("user")
        if (c) return c
        throw new Error(err)
    }
}


export async function findLibraryCard(userId:string):Promise<ILibraryCardModel> {
    try {
        const card = await LibraryCardDao.findOne({_id: userId}).populate("user")
        if (card) return card
        throw new LibraryCardDoesNotExistError("The library card specified does not exist")
    } catch (err:any) {
        if (err instanceof LibraryCardDoesNotExistError) throw err
        throw new Error("unknown error")
    }
}