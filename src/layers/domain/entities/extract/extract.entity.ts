import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    ExtractUrlValueObject,
	ExtractReferenceMonthValueObject,
	ExtractReferenceYearValueObject,
	DomainError
} from "@/layers/domain";

export type ExtractProps = {
	referenceMonth: number;
    referenceYear: number;
    expiryDate: Date;
    userId: string;
    url?: string;
    updatedAt?: Date;
}

export class ExtractEntity extends AbstractEntity<ExtractProps> {

	constructor(props: ExtractProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		if (this.props.expiryDate?.getTime() <= (new Date()).getTime()) 
            throw new DomainError("A data de expiração do extrato deve ser maior que a atual");

		const valueObjects = {
			referenceMonth: ExtractReferenceMonthValueObject.create(props.referenceMonth),
			referenceYear: ExtractReferenceYearValueObject.create(props.referenceYear)
		};

		if(props.url !== undefined && props.url !== null) valueObjects["url"] = ExtractUrlValueObject.create(props.url);

		this.validate(valueObjects);
	}

	public get referenceMonth(): number {
		return this.props.referenceMonth;
	}

	public get referenceYear(): number {
		return this.props.referenceYear;
	}

	public get userId(): string {
		return this.props.userId;
	}

	public get url(): string {
		return this.props.url;
	}

	public set url(url: string) {
		const result = ExtractUrlValueObject.create(url);
		if(result instanceof Error) throw result;
		this.props.url = url;
		this.props.updatedAt = new Date();
	}

	public get updatedAt(): Date {
		return this.props.updatedAt;
	}
}