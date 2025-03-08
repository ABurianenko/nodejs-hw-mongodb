import {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    patchContact
} from '../services/contacts.js';

import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res,next) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    };

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactContoller = async(req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    };

    res.status(204).send();
};

export const patchContactConroller = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await patchContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    };

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result,
    });
};