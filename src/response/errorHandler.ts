import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errors = [];
    let status = 500;
    
    if(err) {
        switch(err.constructor.name) {
            // when express-validator throws the error
            case 'Result':
                errors = err.array().map((e: any) => {
                    return {
                        message: e.msg || e.message,
                        field: e.param
                    }
                });
                status = err.code || 400;
                break;

            case 'ResponseError':
                errors = err.response?.body?.errors?.map((e: any) => {
                    return {
                        message: e.msg || e.message
                    }
                }) || [{ message: 'An error occured' }];
                status = err.code || 422;
                break;

            default:
                errors = [{ message: err.message || 'An Error occured' }]
                status = err.code || 500;
                break;
        }
    }

    if(isNaN(status)) {
        status = 500;
    }

    res.status(status).send(errors);
}