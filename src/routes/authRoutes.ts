import express from 'express';
import { authByUsername } from '../controllers/auth.controller';

export default (router: express.Router) => {
    router.post('/auth', authByUsername);
};
