import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface TokenPeayload{
    iat: number;
    exp: number;
    sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as TokenPeayload;

        
        request.user = {
            id: sub,
        }

        return next();
    }catch(err){
        throw new AppError("Invalid JWT token", 401);
    }
}