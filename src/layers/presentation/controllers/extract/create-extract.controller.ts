import { ICreateExtractUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class CreateExtractController extends AbstractController {

    constructor(
        private readonly useCase: ICreateExtractUseCase,
        log: ILog
    ) { 
        super(
            log,
            "CreateExtract",
            {
                userId: {
                    type: "string",
                    optional: false
                },
                referenceYear: {
                    type: "number",
                    optional: false
                },
                referenceMonth: {
                    type: "number",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { referenceYear, referenceMonth } = request.data;
        const body = { 
            userId: request.userId,
            referenceYear, 
            referenceMonth
        };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute(body);

        return HttpHelper.created(response);
    }
}