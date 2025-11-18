import * as yup from "yup";
import type {Request, Response, NextFunction} from "express";

export function validate1(schema: yup.ObjectSchema<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.validate(
                {
                    body: req.body,
                    params: req.params,
                    query: req.query
                },
                {abortEarly: false}
            );

            // assign validated values safely
            if (validated.query && validated.query !== undefined) req.query = {...req.query, ...validated.query};
            if (validated.body && validated.body !== undefined) req.body = validated.body;
            if (validated.params && validated.params !== undefined) req.params = {...req.params, ...validated.params};

            return next();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: error.errors
                });
            }

            return res.status(500).json({
                message: "Unexpected error",
                error
            });
        }
    };
}

export function validate(schema: yup.ObjectSchema<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        try {
            const validated = await schema.validate(
                {
                    body: req.body,
                    params: req.params,
                    query: req.query
                },
                {abortEarly: false, stripUnknown: true}
            );

            if (validated.body) req.body = validated.body;
            if (validated.params) Object.assign(req.params, validated.params);
            if (validated.query) Object.assign(req.query, validated.query);

            next();
        } catch (err:any) {
            if (err instanceof yup.ValidationError) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: err.errors
                });
            }

            return res.status(500).json({
                message: "Unexpected error",
                error: err.message
            });
        }
    };
}

