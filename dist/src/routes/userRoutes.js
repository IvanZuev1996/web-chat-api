import { createUser, getUsers, deleteUserById } from '../controllers/user.controller';
export default (router) => {
    router.get('/users', getUsers);
    router.post('/users', createUser);
    router.delete('/users/:id', deleteUserById);
};
