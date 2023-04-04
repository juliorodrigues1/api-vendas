import { Router } from "express";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";
import { Joi, Segments, celebrate } from "celebrate";

const passwordsRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordsRoutes.post(
    "/forgot",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.create
);


export default passwordsRoutes;