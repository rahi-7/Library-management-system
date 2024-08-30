import { Request, Response } from "express";
import { IUser } from "../models/User";
import { register, login } from "../services/UserService";
import { IUserModel } from "../daos/UserDao";
import { InvalidUsernameOrPasswordError } from "../utils/libraryErrors";

async function handleRegister(req: Request, res: Response) {
    const user: IUser = req.body;
    try {
        const registeredUser = await register(user);

        // Create a new object excluding the password field
        const { password, ...userWithoutPassword } = registeredUser.toObject();

        res.status(201).json({message:"user successfullly created",user:userWithoutPassword});
    } catch (error:any) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(409).json({ message: "User with this email already exists",error:error.message });
        } else {
            res.status(500).json({message: "unable to regester a user at this time", error:error.message});
        }
    }
}


async function handleLogin(req:Request, res:Response) {
    const credentials = req.body

    try {
        const user:IUserModel = await login(credentials);
        if (user) {
            // Create a new object excluding the password field
            const { password, ...userWithoutPassword } = user.toObject();
            res.status(200).json({message:"user logged in successfully",user:userWithoutPassword})
        } else {
            res.status(404).json({message:"user not found"})
        }
        
    } catch (error:any) {
        if (error instanceof InvalidUsernameOrPasswordError) {
            res.status(404).json({message: "unable to login at this time", error:error.message})
        }
        res.status(500).json({message: "unable to login at this time", error:error.message})
    }
}


export default {handleRegister, handleLogin}