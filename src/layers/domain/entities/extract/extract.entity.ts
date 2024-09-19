import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    ExtractUrlValueObject,
    DomainError, 
	ExtractReferenceMonthValueObject
} from "@/layers/domain";

export type ExtractProps = {
    url: string;
    referenceMonth: number;
}

export class ExtractEntity extends AbstractEntity<ExtractProps> {

	constructor(props: ExtractProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		const valueObjets = {
			url: ExtractUrlValueObject.create(props.url),
			referenceMonth: ExtractReferenceMonthValueObject.create(props.referenceMonth),
		};

		const result = this.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

	public get referenceMonth(): number {
		return this.props.referenceMonth;
	}

	public get url(): string {
		return this.props.url;
	}
}