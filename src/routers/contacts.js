import { Router } from "express";
import {
    getAllContactsController,
    getContactByIdController,
    createContactContoller,
    deleteContactController,
    patchContactConroller
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactsSchema, updateContactsSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValid.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.USER),ctrlWrapper(getAllContactsController));
router.get('/:contactId',
    checkRoles(ROLES.USER),
    isValidId,
    ctrlWrapper(getContactByIdController));

router.post('/',
    checkRoles(ROLES.USER),
    validateBody(createContactsSchema),
    ctrlWrapper(createContactContoller));
router.delete('/:contactId',
    checkRoles(ROLES.USER),
    isValidId,
    ctrlWrapper(deleteContactController));
router.patch('/:contactId',
    checkRoles(ROLES.USER),
    isValidId,
    validateBody(updateContactsSchema),
    ctrlWrapper(patchContactConroller));

export default router;