import { HttpRequest, HttpResponse } from "./http.dtos";

export interface IHttp {
    http(request: HttpRequest): Promise<HttpResponse>;
}