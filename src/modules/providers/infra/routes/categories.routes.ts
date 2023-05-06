import {Router} from "express";
import {ListCategoriesController} from "../controllers/ListCategoriesController";

const categoriesRouter = Router()
const listCategoriesController = new ListCategoriesController()

categoriesRouter.get('/', listCategoriesController.handle)

export default categoriesRouter

