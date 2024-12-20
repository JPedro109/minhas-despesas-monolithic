import { 
    IUnitOfWorkRepository, 
    IUserRepository, 
    IUserConsentRepository, 
    IUserVerificationCodeRepository, 
    ICustomerRepository, 
    IPlanRepository, 
    ISubscriptionRepository, 
    IExpenseRepository, 
    IPaymentMethodRepository, 
    IPaymentHistoryRepository, 
    IExtractRepository 
} from "@/layers/application";

import { DatabaseSQLHelper, PrismaClientType } from "@/layers/external";

export class PrismaUnitOfWorkRepositoryAdapter implements IUnitOfWorkRepository {
    constructor(
        private readonly databaseSQLHelper: DatabaseSQLHelper,
        private readonly userRepository: IUserRepository,
        private readonly userConsentRepository: IUserConsentRepository,
        private readonly userVerificationCodeRepository: IUserVerificationCodeRepository,
        private readonly customerRepository: ICustomerRepository,
        private readonly planRepository: IPlanRepository,
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly expenseRepository: IExpenseRepository,
        private readonly paymentMethodRepository: IPaymentMethodRepository,
        private readonly paymentHistoryRepository: IPaymentHistoryRepository,
        private readonly extractRepository: IExtractRepository
    ) { }

	private setContext(context: PrismaClientType): void {
		this.userRepository.setContext(context);
        this.userRepository.setContext(context);
        this.userConsentRepository.setContext(context);
        this.userVerificationCodeRepository.setContext(context);
        this.customerRepository.setContext(context);
        this.planRepository.setContext(context);
        this.subscriptionRepository.setContext(context);
        this.expenseRepository.setContext(context);
        this.paymentMethodRepository.setContext(context);
        this.paymentHistoryRepository.setContext(context);
        this.extractRepository.setContext(context);
	}

	async transaction(querys: () => Promise<void>): Promise<void> {
		await this.databaseSQLHelper.client.$transaction(async context => {
			this.setContext(context as PrismaClientType);
			try {
                await querys();
            } catch(e) {
                this.setContext(this.databaseSQLHelper.client);
                throw e;
            }
		});

		this.setContext(this.databaseSQLHelper.client);
	}

    getUserRepository(): IUserRepository {
        return this.userRepository;
    }

    getUserConsentRepository(): IUserConsentRepository {
        return this.userConsentRepository;
    }

    getUserVerificationCodeRepository(): IUserVerificationCodeRepository {
        return this.userVerificationCodeRepository;
    }

    getCustomerRepository(): ICustomerRepository {
        return this.customerRepository;
    }

    getPlanRepository(): IPlanRepository {
        return this.planRepository;
    }

    getSubscriptionRepository(): ISubscriptionRepository {
        return this.subscriptionRepository;
    }

    getExpenseRepository(): IExpenseRepository {
        return this.expenseRepository;
    }

    getPaymentMethodRepository(): IPaymentMethodRepository {
        return this.paymentMethodRepository;
    }

    getPaymentHistoryRepository(): IPaymentHistoryRepository {
        return this.paymentHistoryRepository;
    }

    getExtractRepository(): IExtractRepository {
        return this.extractRepository;
    }
}