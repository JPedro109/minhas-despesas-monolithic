import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    ExtractUrlValueObject,
    DomainError, 
	ExtractReferenceMonthValueObject
} from "@/layers/domain";

export type ExtractProps = {
    url: string;
    referenceMonth: number;
    createdAt: Date;
}

export class ExtractEntity extends AbstractEntity<ExtractProps> {

	constructor(props: ExtractProps, id?: string) {
		super(props, id);

		const valueObjets = {
			url: ExtractUrlValueObject.create(props.url),
			referenceMonth: ExtractReferenceMonthValueObject.create(props.referenceMonth),
		};

		const result = ExtractEntity.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

	public get url(): string {
		return this.props.url;
	}

	public get createdAt(): Date {
		return this.props.createdAt;
	}
}