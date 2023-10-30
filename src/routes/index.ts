import express from 'express';
import users from './userRoutes';
import auth from './authRoutes';
import messages from './messageRoutes';

const router = express.Router();

export default (): express.Router => {
    users(router);
    messages(router);
    auth(router);

    return router;
};
