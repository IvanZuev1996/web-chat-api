import express from 'express';
import {
    createMessage,
    deleteMessageById,
    getMessages
} from '../controllers/message.controller';

export default (router: express.Router) => {
    router.get('/messages', getMessages);
    router.post('/messages', createMessage);
    router.delete('/messages/:id', deleteMessageById);
};
