import {Entity, model, property} from '@loopback/repository';

@model()
export class PayMethod extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPayMethod?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'number',
  })
  cardNumber?: number;

  @property({
    type: 'number',
    required: true,
  })
  idPassenger: number;


  constructor(data?: Partial<PayMethod>) {
    super(data);
  }
}

export interface PayMethodRelations {
  // describe navigational properties here
}

export type PayMethodWithRelations = PayMethod & PayMethodRelations;
