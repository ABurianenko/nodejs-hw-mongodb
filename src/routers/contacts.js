import { Router } from "express";
import {
    getAllContactsController,
    getContactByIdController,
    createContactContoller,
    deleteContactController,
    patchContactConroller
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactContoller));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactConroller));

export default router;