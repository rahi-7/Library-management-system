import mongoose, { Schema, Document } from "mongoose";
import { ILibraryCard } from "../models/LibraryCard";

export interface ILibraryCardModel extends ILibraryCard, Document {}

const libraryCardSchema:Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User"
    }
})

export default mongoose.model<ILibraryCardModel>('LibraryCard', libraryCardSchema)