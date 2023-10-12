import {Entity, model, property, hasMany, hasOne, belongsTo} from '@loopback/repository';
import {Driver} from './driver.model';
import {Status} from './status.model';
import {Distance} from './distance.model';
import {Travel} from './travel.model';
import {Passenger} from './passenger.model';

@model({
  settings: {
    foreignKeys: {
      fk_request_passenger: {
        name: 'fk_request_passenger',
        entity: 'Passenger',
        entityKey: 'idPassenger',
        foreignKey: 'passengerId',
      },
      fk_request_status: {
        name: 'fk_request_status',
        entity: 'Status',
        entityKey: 'idState',
        foreignKey: 'statusId',
      },
      fk_request_distance: {
        name: 'fk_request_distance',
        entity: 'Distance',
        entityKey: 'idDistance',
        foreignKey: 'distanceId',
      },
      fk_request_travel: {
        name: 'fk_request_travel',
        entity: 'Travel',
        entityKey: 'idTravel',
        foreignKey: 'travelId',
      },
    },
  },
})
export class Request extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idRequest?: number;

  @property({
    type: 'date',
    required: true,
  })
  requestDate: string;

  @property({
    type: 'string',
    required: true,
  })
  pickup: string;

  @property({
    type: 'string',
    required: true,
  })
  destination: string;

  @hasMany(() => Driver)
  drivers: Driver[];

  @property({
    type: 'number',
  })
  statusId?: number;

  @hasOne(() => Status)
  status: Status;

  @property({
    type: 'number',
  })
  distanceId?: number;

  @hasOne(() => Distance)
  distance: Distance;

  @property({
    type: 'number',
  })
  travelId?: number;

  @hasOne(() => Travel)
  travel: Travel;

  @belongsTo(() => Passenger)
  passengerId: number;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
