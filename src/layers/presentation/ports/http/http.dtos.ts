/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
	headers?: any;
	data?: any;
	userId?: string;
	method?: string;
	path?: string;
}

export type HttpResponse = {
    statusCode: number;
    response?: any;
}