import { AbstractEntity } from "../abstract/abstract.entity";

export type UserConsentProps = {
    userId: string;
    consentVersion: string;
    ipAddress: string;
    userAgent: string;
}

export class UserConsentEntity extends AbstractEntity<UserConsentProps> {

    constructor(props: UserConsentProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);
    }

    get userId(): string {
        return this.props.userId;
    }

    get consentVersion(): string {
        return this.props.consentVersion;
    }

    get ipAddress(): string | undefined {
        return this.props.ipAddress;
    }

    get userAgent(): string | undefined {
        return this.props.userAgent;
    }
}