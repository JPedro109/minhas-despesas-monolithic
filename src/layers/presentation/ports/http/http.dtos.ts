/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
    headers?: any;
    body?: any;
    params?: any;
    query?: any;
    userId?: string;
    method?: string;
    path?: string;
    ipAddress?: string;
    userAgent?: string;
};

export type HttpResponse = {
    statusCode: number;
    response?: any;
};
