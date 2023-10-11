import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Car} from './car.model';
import {Request} from './request.model';
import {Record} from './record.model';

@model()
export class Driver extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idDriver?: number;

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
    type: 'number',
    required: true,
  })
  carID: number;

  @property({
    type: 'string',
    required: true,
  })
  userPhoto: string;

  @property({
    type: 'boolean',
    required: true,
  })
  available: boolean;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'number',
  })
  carId?: number;
  @hasOne(() => Car)
  car: Car;

  @belongsTo(() => Request)
  requestId: number;

  @property({
    type: 'number',
  })
  recordId?: number;

  @hasOne(() => Record)
  record: Record;

  constructor(data?: Partial<Driver>) {
    super(data);
  }
}

export interface DriverRelations {
  // describe navigational properties here
}

export type DriverWithRelations = Driver & DriverRelations;
