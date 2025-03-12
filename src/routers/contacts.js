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
const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController));

router.post('/contacts',
    validateBody(createContactsSchema),
    ctrlWrapper(createContactContoller));
router.delete('/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId',
    isValidId,
    validateBody(updateContactsSchema),
    ctrlWrapper(patchContactConroller));

export default router;