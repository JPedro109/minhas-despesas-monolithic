import { ISecurity, UnauthorizedError } from "@/layers/application";
import { HttpRequest, HttpResponse, HttpHelper, AbstractMiddleware } from "@/layers/presentation";

export class AuthenticateUserMiddleware extends AbstractMiddleware {

	constructor(private readonly secutiry: ISecurity) { 
		super();
	}

	async handler(request: HttpRequest): Promise<HttpResponse> {
		const { authorization } = request.headers;

		if (!authorization) return HttpHelper.unauthorized(new UnauthorizedError("Você não está logado"));
    
		const [bearer, token] = authorization.split(" ");

		if(bearer !== "Bearer") return HttpHelper.unauthorized(new UnauthorizedError("Token inválido"));
    
		const decode = this.secutiry.verifyJsonWebToken(token);

		request.userId = decode.sub as string;

		return HttpHelper.noBody();
	}
}