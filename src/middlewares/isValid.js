import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        throw createHttpError(400, `Contact with id ${contactId} doesn’t exist`);
    };
    next();
};