import {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    patchContact
} from '../services/contacts.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        userId,
        page,
        perPage,
        sortBy,
        sortOrder,
        filter
    });
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await getContactById({userId, contactId});

    if (!contact) {
        throw createHttpError(404, 'Contact not found in your phonebook');
    };

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactContoller = async (req, res) => {
    const { _id: userId } = req.user;

    const contact = await createContact({...req.body, userId});

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const contact = await deleteContact({userId, contactId});

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    };

    res.status(204).send();
};

export const patchContactConroller = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const result = await patchContact({userId, contactId}, req.body);

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