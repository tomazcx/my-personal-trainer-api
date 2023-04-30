import ensureAuthenticated from "@modules/users/infra/middlewares/ensureAuthenticated";
import {Router} from "express";
import {ListCategoriesController} from "../controllers/ListCategoriesController";

const categoriesRouter = Router()
const listCategoriesController = new ListCategoriesController()

categoriesRouter.use(ensureAuthenticated)

categoriesRouter.get('/', listCategoriesController.handle)

export default categoriesRouter

