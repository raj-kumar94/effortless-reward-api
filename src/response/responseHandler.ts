import { Response } from "express";

type responseHandlerType = {
    res: Response;
    status?: number;
    data?: any;
    message?: string;
}

export const responseHandler = ({ res, status = 200, data = null, message = 'success' }: responseHandlerType) => {
    res.status(status).send({ data, message });
}