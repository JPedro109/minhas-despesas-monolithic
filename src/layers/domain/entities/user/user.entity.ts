import { AbstractEntity } from "../abstract/abstract.entity";
import { UserEmailValueObject, UserPasswordValueObject, UsernameValueObject, DomainError } from "@/layers/domain";

export type UserProps = {
	email: string;
	username: string;
	password: string;
	verifiedEmail: boolean;
	createdAt: Date;
	updatedAt?: Date;
}

export class UserEntity extends AbstractEntity<UserProps> {

	constructor(props: UserProps, id?: string) {
		super(props, id);

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
	}

	get username(): string {
		return this.props.username;
	}

	set username(username: string) {
		const result = UsernameValueObject.create(username);
		if (result instanceof Error) throw result;
		this.props.username = result.value;
	}

	get password(): string {
		return this.props.password;
	}

	set password(password: string) {
		const result = UserPasswordValueObject.create(password);
		if (result instanceof Error) throw result;
		this.props.password = result.value;
	}

	get verifiedEmail(): boolean {
		return this.props.verifiedEmail;
	}

	set verifiedEmail(verifiedEmail: boolean) {
		if(this.props.verifiedEmail) throw new DomainError("O email já está verificado");
		this.props.verifiedEmail = verifiedEmail;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	set updatedAt(updatedAt: Date) {
		this.props.updatedAt = updatedAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}
}