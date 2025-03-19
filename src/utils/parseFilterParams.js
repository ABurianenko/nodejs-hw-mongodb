import createHttpError from "http-errors";

const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);

    if (!isType(type)) {
        throw createHttpError(404, "Contact not found");
    }
    return type;
};

const parseFavourite = (isFavourite) => {
    if (typeof isFavourite !== 'string') return;
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const filter = {};

    const parsedType = parseType(type);
    const parsedFavourite = parseFavourite(isFavourite);

    if (parsedType !== undefined) {
        filter.contactType = parsedType;
    }

    if (parsedFavourite !== undefined) {
        filter.isFavourite = parsedFavourite;
    }

    return filter;
};