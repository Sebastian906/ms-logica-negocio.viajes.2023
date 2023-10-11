import {Entity, model, property, hasOne} from '@loopback/repository';
import {Travel} from './travel.model';
import {Passenger} from './passenger.model';
import {Driver} from './driver.model';

@model()
export class Record extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idRecord?: number;

  @property({
    type: 'string',
    required: true,
  })
  travelRoute: string;

  @property({
    type: 'string',
  })
  driverComment?: string;

  @property({
    type: 'number',
    required: true,
  })
  idTravel: number;

  @property({
    type: 'number',
    required: true,
  })
  idPassenger: number;

  @property({
    type: 'number',
    required: true,
  })
  idDriver: number;

  @property({
    type: 'number',
  })
  travelId?: number;

  @hasOne(() => Travel)
  travel: Travel;

  @property({
    type: 'number',
  })
  passengerId?: number;

  @hasOne(() => Passenger)
  passenger: Passenger;

  @hasOne(() => Driver)
  driver: Driver;

  @property({
    type: 'number',
  })
  driverId?: number;

  constructor(data?: Partial<Record>) {
    super(data);
  }
}

export interface RecordRelations {
  // describe navigational properties here
}

export type RecordWithRelations = Record & RecordRelations;
