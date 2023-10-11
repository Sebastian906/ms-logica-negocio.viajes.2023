import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Distance} from './distance.model';
import {Request} from './request.model';
import {Record} from './record.model';
import {PayMethod} from './pay-method.model';

@model()
export class Travel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idTravel?: number;

  @property({
    type: 'string',
    required: true,
  })
  totalPaid: string;

  @property({
    type: 'string',
    required: true,
  })
  rate: string;

  @property({
    type: 'date',
    required: true,
  })
  rateDate: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'number',
    required: true,
  })
  idRequest: number;

  @property({
    type: 'number',
    required: true,
  })
  idPayMethod: number;

  @hasOne(() => Distance)
  distance: Distance;

  @property({
    type: 'number',
  })
  distanceId?: number;

  @hasOne(() => Request)
  request: Request;

  @property({
    type: 'number',
  })
  requestId?: number;

  @hasOne(() => Record)
  record: Record;

  @property({
    type: 'number',
  })
  recordId?: number;

  @belongsTo(() => PayMethod)
  payMethodId: number;

  constructor(data?: Partial<Travel>) {
    super(data);
  }
}

export interface TravelRelations {
  // describe navigational properties here
}

export type TravelWithRelations = Travel & TravelRelations;
