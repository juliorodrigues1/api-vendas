import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import { ProfileController } from "../controllers/ProfileController";

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(isAuthenticated)

profileRoutes.get(
    '/',
    profileController.showProfile
);

profileRoutes.put(
    '/',
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
            .valid(Joi.ref('password'))
            .when('password', {
                is: Joi.exist(),
                then: Joi.required(),
            })
        }
    }),
    profileController.updateProfile,
);

export default profileRoutes;