import { IHttp } from "@/layers/presentation";
import { Request, Response, NextFunction } from "express";

export class RestAdapter {
    static route = (route: IHttp) => {
        return async (req: Request, res: Response): Promise<void> => {
            const { response, statusCode } = await route.http({
                body: req.body,
                params: req.params,
                query: req.query,
                userId: req.userId,
                headers: req.headers,
                method: req.method,
                path: req.originalUrl,
                ipAddress: req.hostname,
                userAgent: req.headers["user-agent"],
            });

            if (statusCode === 204) res.status(statusCode).json();
            else res.status(statusCode).json(response);
        };
    };

    static middleware = (middleware: IHttp) => {
        return async (
            req: Request,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const request = {
                data: { ...req.body, ...req.query, ...req.params },
                userId: req.userId,
                headers: req.headers,
                method: req.method,
                path: req.originalUrl,
            };

            const { response, statusCode } = await middleware.http(request);

            if (statusCode > 399 && statusCode <= 500) {
                res.status(statusCode).json(response);
            } else {
                req.userId = request.userId;
                next();
            }
        };
    };
}
