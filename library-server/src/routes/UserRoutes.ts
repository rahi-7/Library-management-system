import express from 'express'
import UserController from '../controllers/UserController'
import { Schemas, ValidateSchema } from '../middlewares/Validation'
const router = express.Router()

router.get("/", UserController.getAllUsers)
      .get("/:userId", ValidateSchema(Schemas.user.userId, "params"),UserController.getUserByiD)
      .put("/", ValidateSchema(Schemas.user.update, "body"), UserController.updateUser)
      .delete("/:userId", ValidateSchema(Schemas.user.userId, "params"), UserController.deleteUser)

export = router