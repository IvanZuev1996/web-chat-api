import express from 'express';
import {
    createUser,
    getUsers,
    deleteUserById
} from '../controllers/user.controller';

export default (router: express.Router) => {
    router.get('/users', getUsers);
    router.post('/users', createUser);
    router.delete('/users/:id', deleteUserById);
};
