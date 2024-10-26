import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    ExtractUrlValueObject,
	ExtractReferenceMonthValueObject,
	ExtractReferenceYearValueObject
} from "@/layers/domain";

export type ExtractProps = {
    url: string;
    referenceMonth: number;
    referenceYear: number;
}

export class ExtractEntity extends AbstractEntity<ExtractProps> {

	constructor(props: ExtractProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		const valueObjects = {
			url: ExtractUrlValueObject.create(props.url),
			referenceMonth: ExtractReferenceMonthValueObject.create(props.referenceMonth),
			referenceYear: ExtractReferenceYearValueObject.create(props.referenceYear)
		};

		this.validate(valueObjects);
	}

	public get referenceMonth(): number {
		return this.props.referenceMonth;
	}

	public get referenceYear(): number {
		return this.props.referenceYear;
	}

	public get url(): string {
		return this.props.url;
	}
}