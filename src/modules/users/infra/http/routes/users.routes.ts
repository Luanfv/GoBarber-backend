import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticacte from '../middlewares/ensureAuthenticacte';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    usersController.create
);

usersRouter.patch('/avatar', ensureAuthenticacte, upload.single('avatar'), userAvatarController.update);

export default usersRouter;