import bcrypt from "bcrypt"
import { config } from "../config"
import { IUser } from "../models/User"
import UserDao, { IUserModel } from "../daos/UserDao"
import { UnableToSaveUserError, InvalidUsernameOrPasswordError, UserDoesNotExistError } from "../utils/libraryErrors"

export async function register(user:IUser):Promise<IUserModel> {
    const ROUNDS = config.server.rounds

    try {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS)

        const saved = new UserDao({...user, password:hashedPassword})

        return await saved.save()
    } catch(error:any) {
        throw new UnableToSaveUserError(error.message)
    }
}


export async function login(credentials:{email:string, password:string}):Promise<IUserModel> {
    const {email, password} = credentials
    try {
        const user = await UserDao.findOne({email: email})
        if (!user) {
            throw new InvalidUsernameOrPasswordError("User not found, Invalid username")
        } else {
            const isPasswordValid:boolean = await bcrypt.compare(password, user.password)
            if (isPasswordValid) {
                return user
            } else {
              throw new InvalidUsernameOrPasswordError("Invalid password")
            }
        }
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function findAllUsers():Promise<IUserModel[]> {
    try{
        return await UserDao.find()
    } catch(error:any) {
        throw new Error(error.message)
    }
}

export async function findUserById(userId:string):Promise<IUserModel> {
    try {
        const user = await UserDao.findById(userId)
        if (user) {
            return user
        } else {
            throw new UserDoesNotExistError("User not found")
        }
    } catch (err:any){
        // Only rethrow if it's not a UserDoesNotExistError
        if (err instanceof UserDoesNotExistError) {
            throw err;
        } else {
            throw new Error(err.message);
        }
    }
}

export async function modifyUser(user:IUserModel):Promise<IUserModel> {
    try {
        const updatedUser = await UserDao.findByIdAndUpdate(user._id, user, {new: true})
        if (updatedUser) {
            return updatedUser
        } else {
            throw new UserDoesNotExistError("Cannot update user")
        }
    } catch (err:any){
        // Only rethrow if it's not a UserDoesNotExistError
        if (err instanceof UserDoesNotExistError) {
            throw err;
        } else {
            throw new Error(err.message);
        }
    }
}

export async function removeUser(userId:string):Promise<IUserModel> {
    try {
        const deletedUser = await UserDao.findByIdAndDelete(userId)
        if (deletedUser) {
            return deletedUser
        } else {
            throw new UserDoesNotExistError("Cannot delete user with this Id")
        }
    } catch (err:any){
       // Only rethrow if it's not a UserDoesNotExistError
        if (err instanceof UserDoesNotExistError) {
            throw err;
        } else {
            throw new Error(err.message);
        }
    }
}