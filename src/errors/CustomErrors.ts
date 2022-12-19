import { CustomError as CustomError2 } from "ts-custom-error";


export class CustomError extends CustomError2 {
    public constructor(public code: number, message?: string) {
        super(message);
    }
}