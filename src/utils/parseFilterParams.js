const parseType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if (isType(contactType)) return contactType;
};

const parseFavourite = (isFavourite) => {
    if (typeof isFavourite !== 'string') return;
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedType = parseType(contactType);
    const parsedFavourite = parseFavourite(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedFavourite,
    };
};