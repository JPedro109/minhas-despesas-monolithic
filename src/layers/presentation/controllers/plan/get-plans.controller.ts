import { IGetPlansUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper } from "@/layers/presentation";

export class GetPlansController extends AbstractController {

    constructor(
        private readonly useCase: IGetPlansUseCase,
        log: ILog
    ) { 
        super(
            log,
            "GetPlans"
        );
    }

    protected async handler(): Promise<HttpResponse> {
        const result = await this.useCase.execute();

        return HttpHelper.ok(result);
    }
}