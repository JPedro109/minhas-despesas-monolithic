import { InvalidPlanActionError } from "@/layers/domain";

export type PlanActionValueObjectProps = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class PlanActionValueObject {

  private constructor(private readonly props: PlanActionValueObjectProps) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: PlanActionValueObjectProps): PlanActionValueObject | InvalidPlanActionError {
    const messages = [];
    if (!this.validateName(props.name)) messages.push("O nome do plano deve ter entre 1 e 15 caracteres");
    if (!this.validateDescription(props.description)) messages.push("A descrição do plano deve ter entre 1 e 50 caracteres");

    if(messages.length > 0) return new InvalidPlanActionError(messages.join(", "));

    return new PlanActionValueObject(props);
  }

  private static validateName(name: string): boolean {
    if (!name || name.length > 15) return false;
    return true;
  }

  private static validateDescription(description: string): boolean {
    if (!description || description.length > 50) return false;
    return true;
  }
}