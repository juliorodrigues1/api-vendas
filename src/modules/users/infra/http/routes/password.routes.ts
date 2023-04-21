import { Router } from "express";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";
import { Joi, Segments, celebrate } from "celebrate";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

const passwordsRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordsRoutes.post(
    "/forgot",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.create
);

passwordsRoutes.post(
    "/reset",
    celebrate({
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(Joi.ref("password")),
            token: Joi.string().uuid().required(),
        },
    }),
    resetPasswordController.create
);


export default passwordsRoutes;