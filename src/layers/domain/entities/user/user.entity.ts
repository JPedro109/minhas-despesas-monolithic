import { AbstractEntity } from "../abstract/abstract.entity";
import { UserEmail, UserPassword, Username, DomainError } from "@/layers/domain";

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
			email: UserEmail.create(props.email),
			username: Username.create(props.email),
			password: UserPassword.create(props.password),
		};

		const result = UserEntity.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

	get email(): string {
		return this.props.email;
	}

	set email(email: string) {
		const result = UserEmail.create(email);
		if (result instanceof Error) throw result;
		this.props.email = result.value;
	}

	get username(): string {
		return this.props.username;
	}

	set username(username: string) {
		const result = Username.create(username);
		if (result instanceof Error) throw result;
		this.props.username = result.value;
	}

	get password(): string {
		return this.props.password;
	}

	set password(password: string) {
		const result = UserPassword.create(password);
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