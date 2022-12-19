import express, { Express, Request, Response, NextFunction } from 'express';

export const isUser = (req: Request, res: Response, next: NextFunction) => {

    // parse the jwt token and assign to the user
    req.user = {
        email: 'test@gmail.com'
    }
    req.shop = req.get('x-shopify-auth');
    next();
}