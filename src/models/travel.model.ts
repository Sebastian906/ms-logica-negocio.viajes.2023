import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Distance} from './distance.model';
import {Request} from './request.model';
import {Record} from './record.model';
import {PayMethod} from './pay-method.model';

@model({
  settings: {
    foreignKeys: {
      fk_travel_distance: {
        name: 'fk_travel_distance',
        entity: 'Distance',
        entityKey: 'idDistance',
        foreignKey: 'distanceId',
      },
      fk_travel_request: {
        name: 'fk_travel_request',
        entity: 'Request',
        entityKey: 'idRequest',
        foreignKey: 'requestId',
      },
      fk_travel_record: {
        name: 'fk_travel_record',
        entity: 'Record',
        entityKey: 'idRecord',
        foreignKey: 'recordId',
      },
      fk_travel_pay_method: {
        name: 'fk_travel_pay_method',
        entity: 'PayMethod',
        entityKey: 'idPayMethod',
        foreignKey: 'payMethodId',
      },
    },
  },
})
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
