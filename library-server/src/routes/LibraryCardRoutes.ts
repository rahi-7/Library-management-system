import express from 'express'
const router = express.Router()
import LibraryCardController from '../controllers/LibraryCardController'
import { Schemas, ValidateSchema } from '../middlewares/Validation'



router.get("/:cardId", ValidateSchema(Schemas.libraryCard.get, "params"), LibraryCardController.getLibraryCard)
router.post("/", ValidateSchema(Schemas.libraryCard.create, "body"), LibraryCardController.createLibraryCard)

export = router