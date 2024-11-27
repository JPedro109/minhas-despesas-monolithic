import { IAuthentication, UnauthorizedError } from "@/layers/application";
import { HttpRequest, HttpResponse, HttpHelper, AbstractMiddleware } from "@/layers/presentation";

export class AuthenticateUserMiddleware extends AbstractMiddleware {

	constructor(private readonly jsonWebToken: IAuthentication) { 
		super();
	}

	async handler(request: HttpRequest): Promise<HttpResponse> {
		const { authorization } = request.headers;

		if (!authorization) return HttpHelper.unauthorized(new UnauthorizedError("Você não está logado"));
    
		const [bearer, token] = authorization.split(" ");

		if(bearer !== "Bearer") return HttpHelper.unauthorized(new UnauthorizedError("Token inválido"));
    
		const decode = this.jsonWebToken.verifyJsonWebToken(token);

		request.userId = decode.id as string;

		return HttpHelper.noBody();
	}
}