import { startServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { createDirIfNotExist } from "./utils/createDirIfNotExist.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

const bootstrap = async () => {
    await initMongoConnection();
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOAD_DIR);
    startServer();
};

bootstrap();