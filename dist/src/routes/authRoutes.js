import { authByUsername } from '../controllers/auth.controller';
export default (router) => {
    router.post('/auth', authByUsername);
};
