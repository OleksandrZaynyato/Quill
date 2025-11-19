import * as yup from "yup";
import type {Request, Response, NextFunction} from "express";

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

