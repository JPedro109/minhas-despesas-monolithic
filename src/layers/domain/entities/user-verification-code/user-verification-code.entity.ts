import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    UserVerificationCodeValueObject, 
    UserVerificationCodeTypeValueObject, 
    UserVerificationCodeTypeValueObjectProps, 
	UserEntity,
    DomainError 
} from "@/layers/domain";

export type UserVerificationCodeProps = {
    type: UserVerificationCodeTypeValueObjectProps;
    verificationCode: string;
    verificationCodeExpiryDate: Date;
    valid: boolean;
    user: UserEntity;
    createdAt: Date;
    updatedAt?: Date;
}

export class UserVerificationCodeEntity extends AbstractEntity<UserVerificationCodeProps> {

	constructor(props: UserVerificationCodeProps, id?: string) {
		super(props, id);

		const valueObjets = {
			verificationCode: UserVerificationCodeValueObject.create(props.verificationCode),
            type: UserVerificationCodeTypeValueObject.create(props.type)
		};

		const result = UserVerificationCodeEntity.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

	public get type(): UserVerificationCodeTypeValueObjectProps {
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
		if(this.props.valid && valid) throw new DomainError("Você já está ativo um código");
		this.props.valid = valid;
	}
	
	public get user(): UserEntity {
		return this.props.user;
	}

	public get createdAt(): Date {
		return this.props.createdAt;
	}

	public get updatedAt(): Date  {
		return this.props.updatedAt;
	}

	public set updatedAt(updatedAt: Date) {
		this.props.updatedAt = updatedAt;
	}
}