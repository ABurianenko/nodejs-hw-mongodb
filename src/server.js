import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => { 
    const app = express();
    
    app.use(cors());

    app.use(
        pino({
            transport: {
            target: 'pino-pretty',
            },
        }),
    );

    app.use(express.json());
    app.use(cookieParser());

    app.use(router);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    app.use('/uploads', express.static(UPLOAD_DIR));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};