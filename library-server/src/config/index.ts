import dotenv from "dotenv"

dotenv.config()

export const MONGO_URL:string = process.env.MONGO_URI!

const PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const ROUNDS:number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random()*11)

export const config = {
    mongo: { 
        url: MONGO_URL
    }, 
    server: {
        port: PORT,
        rounds: ROUNDS
    }
}