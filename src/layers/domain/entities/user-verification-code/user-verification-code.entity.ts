import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    UserVerificationCodeValueObject, 
    UserVerificationCodeTypeValueObject, 
	UserEntity,
    DomainError 
} from "@/layers/domain";

export type UserVerificationCodeProps = {
    type: "create_user" | "update_user" | "verify_user_email";
    verificationCode: string;
    verificationCodeExpiryDate: Date;
    valid: boolean;
    user: UserEntity;
    updatedAt?: Date;
}

export class UserVerificationCodeEntity extends AbstractEntity<UserVerificationCodeProps> {

	constructor(props: UserVerificationCodeProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		const valueObjets = {
			verificationCode: UserVerificationCodeValueObject.create(props.verificationCode),
            type: UserVerificationCodeTypeValueObject.create(props.type)
		};

		const result = this.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

	public get type(): string {
		return this.props.type;
	}

	public get verificationCode(): string {
		return this.props.verificationCode;
	}

	public get verificationCodeExpiryDate(): Date {
		return this.props.verificationCodeExpiryDate;
	}

	public get valid(): boolean {
		return this.props.valid;
	}

    public set valid(valid: boolean) {
		if(!this.props.valid) throw new DomainError("O código já está invalidado");
		if(this.props.valid && valid) throw new DomainError("Esse código já está ativo");
		this.props.valid = valid;
        this.props.updatedAt = new Date();
	}
	
	public get user(): UserEntity {
		return this.props.user;
	}

	public get updatedAt(): Date | null {
		return this.props.updatedAt;
	}
}