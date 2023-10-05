import {Entity, model, property} from '@loopback/repository';

@model()
export class PayType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idType?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  idPayMethod: number;


  constructor(data?: Partial<PayType>) {
    super(data);
  }
}

export interface PayTypeRelations {
  // describe navigational properties here
}

export type PayTypeWithRelations = PayType & PayTypeRelations;
