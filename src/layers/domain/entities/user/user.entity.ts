import { AbstractEntity } from "../abstract/abstract.entity";
import { UserEmailValueObject, UserPasswordValueObject, UsernameValueObject, DomainError } from "@/layers/domain";

export type UserProps = {
	email: string;
	username: string;
	password: string;
	verifiedEmail: boolean;
	updatedAt?: Date;
}

export class UserEntity extends AbstractEntity<UserProps> {

	constructor(props: UserProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		const valueObjets = {
			email: UserEmailValueObject.create(props.email),
			username: UsernameValueObject.create(props.email),
			password: UserPasswordValueObject.create(props.password),
		};

		const result = this.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

	get email(): string {
		return this.props.email;
	}

	set email(email: string) {
		const result = UserEmailValueObject.create(email);
		if (result instanceof Error) throw result;
		this.props.email = result.value;
        this.props.updatedAt = new Date();
	}

	get username(): string {
		return this.props.username;
	}

	set username(username: string) {
		const result = UsernameValueObject.create(username);
		if (result instanceof Error) throw result;
		this.props.username = result.value;
        this.props.updatedAt = new Date();
	}

	get password(): string {
		return this.props.password;
	}

	set password(password: string) {
		const result = UserPasswordValueObject.create(password);
		if (result instanceof Error) throw result;
		this.props.password = result.value;
        this.props.updatedAt = new Date();
	}

	get verifiedEmail(): boolean {
		return this.props.verifiedEmail;
	}

	set verifiedEmail(verifiedEmail: boolean) {
		if(this.props.verifiedEmail) throw new DomainError("O email já está verificado");
		this.props.verifiedEmail = verifiedEmail;
        this.props.updatedAt = new Date();
	}

	get updatedAt(): Date | null {
		return this.props.updatedAt;
	}
}