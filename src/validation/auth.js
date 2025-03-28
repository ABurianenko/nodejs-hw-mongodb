import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string', 
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.base': 'Email should be a string', 
        'string.email': 'Email should have .com or .net domen',
        'any.required': 'Email is required',
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{3,10}$')).required().messages({
        'string.base': 'Password should be a string', 
        'string.pattern': 'Username should have at least 1 lowercase symbol, 1 uppercase symbol, 1 number and 1 specific symbol',
        'any.required': 'Username is required',
    }),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{3,10}$')).required(),
});

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
    code: Joi.string().required(),
});