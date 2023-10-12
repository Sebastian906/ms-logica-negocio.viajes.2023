import {Entity, model, property, hasMany, hasOne, belongsTo} from '@loopback/repository';
import {Travel} from './travel.model';
import {PayType} from './pay-type.model';
import {Passenger} from './passenger.model';

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

  @hasMany(() => Travel)
  travels: Travel[];

  @hasOne(() => PayType)
  payType: PayType;

  @property({
    type: 'number',
  })
  payTypeId?: number;

  @belongsTo(() => Passenger)
  passengerId: number;

  constructor(data?: Partial<PayMethod>) {
    super(data);
  }
}

export interface PayMethodRelations {
  // describe navigational properties here
}

export type PayMethodWithRelations = PayMethod & PayMethodRelations;
