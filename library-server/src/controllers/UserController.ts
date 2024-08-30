import { Request, Response } from "express";
import { findAllUsers, findUserById, modifyUser, removeUser } from "../services/UserService";
import { UserDoesNotExistError } from "../utils/libraryErrors";

async function getAllUsers(req:Request, res:Response) {
    try {
        const users = await findAllUsers();
        res.status(200).json({message:"users retrieved successsfully",users})
    } catch(err:any) {
        res.status(500).json({message:"unable to retrieve users",error:err.message})
    }
}

async function getUserByiD(req:Request, res:Response) {
    const {userId} = req.params
    try {
        const user = await findUserById(userId);
        res.status(200).json({message:"user retrieved successsfully",user})
    } catch(err:any) {
        if (err instanceof UserDoesNotExistError) {
            res.status(404).json({message:"users not found",error:err.message})
        }
        res.status(500).json({message:"internal server error",error:err.message})
    }
}

async function updateUser(req:Request, res:Response) {
    const user = req.body
    try {
        const updatedUser = await modifyUser(user);
        res.status(200).json({message:"user updated successsfully",user: updatedUser})
    } catch(err:any) {
        if (err instanceof UserDoesNotExistError) {
            res.status(404).json({message:"unable to update a user",error:err.message})
        }
        res.status(500).json({message:"internal server error",error:err.message})
    }
}

async function deleteUser(req:Request, res:Response) {
    const {userId} = req.params
    try {
        const deletedUser = await removeUser(userId);
        res.status(200).json({message:"user deleted successsfully",user: deletedUser})
    } catch(err:any) {
        if (err instanceof UserDoesNotExistError) {
            res.status(404).json({message:"unable to delete user",error:err.message})
        }
        res.status(500).json({message:"internal server error",error:err.message})
    }
}

export default {getAllUsers, getUserByiD, updateUser, deleteUser}