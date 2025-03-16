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

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController));

router.post('/',
    validateBody(createContactsSchema),
    ctrlWrapper(createContactContoller));
router.delete('/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController));
router.patch('/:contactId',
    isValidId,
    validateBody(updateContactsSchema),
    ctrlWrapper(patchContactConroller));

export default router;