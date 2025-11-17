import * as yup from "yup";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: yup.ObjectSchema<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.validate(
                {
                    body: req.body,
                    params: req.params,
                    query: req.query
                },
                { abortEarly: false, stripUnknown: true }
            );

            // assign validated values safely
            if (validated.body) req.body = validated.body;
            if (validated.params) req.params = { ...req.params, ...validated.params };
            if (validated.query) req.query = { ...req.query, ...validated.query };

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
