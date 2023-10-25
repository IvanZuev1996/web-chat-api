import express from 'express';
import users from './userRoutes';
import messages from './messageRoutes';

const router = express.Router();

export default (): express.Router => {
    users(router);
    messages(router);

    return router;
};
