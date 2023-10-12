import {Entity, model, property, hasMany, hasOne, belongsTo} from '@loopback/repository';
import {Travel} from './travel.model';
import {PayType} from './pay-type.model';
import {Passenger} from './passenger.model';

@model({
  settings: {
    foreignKeys: {
      fk_pay_method_passenger: {
        name: 'fk_pay_method_passenger',
        entity: 'Passenger',
        entityKey: 'idPassenger',
        foreignKey: 'passengerId',
      },
      fk_pay_method_pay_type: {
        name: 'fk_pay_method_pay_type',
        entity: 'PayType',
        entityKey: 'idType',
        foreignKey: 'payTypeId',
      },
    },
  },
})
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
