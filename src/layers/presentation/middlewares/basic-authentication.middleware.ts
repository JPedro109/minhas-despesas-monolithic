import { ISecurity, UnauthorizedError } from "@/layers/application";
import { HttpRequest, HttpResponse, HttpHelper, AbstractMiddleware } from "@/layers/presentation";

export class BasicAuthenticationMiddleware extends AbstractMiddleware {

	constructor(private readonly secutiry: ISecurity) { 
		super();
	}

	async handler(request: HttpRequest): Promise<HttpResponse> {
		const { authorization } = request.headers;

		if (!authorization) return HttpHelper.unauthorized(new UnauthorizedError("Você não está logado"));
    
		const [basic, credential] = authorization.split(" ");

		if(basic !== "Basic") return HttpHelper.unauthorized(new UnauthorizedError("Token inválido"));
    
		const credentialAreValid = this.secutiry.verifyBasicAuthenticationCredential(credential);

        if(!credentialAreValid) return HttpHelper.unauthorized(new UnauthorizedError("Token inválido"));

		return HttpHelper.noBody();
	}
}