import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {PayMethod} from './pay-method.model';
import {Record} from './record.model';
import {Request} from './request.model';

@model()
export class Passenger extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPassenger?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
    required: true,
  })
  userPhoto: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @hasMany(() => PayMethod)
  payMethods: PayMethod[];

  @hasOne(() => Record)
  record: Record;

  @property({
    type: 'number',
  })
  recordId?: number;

  @hasMany(() => Request)
  requests: Request[];

  constructor(data?: Partial<Passenger>) {
    super(data);
  }
}

export interface PassengerRelations {
  // describe navigational properties here
}

export type PassengerWithRelations = Passenger & PassengerRelations;
