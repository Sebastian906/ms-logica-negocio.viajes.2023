import {Entity, model, property, hasOne} from '@loopback/repository';
import {Request} from './request.model';
import {Travel} from './travel.model';

@model({
  settings: {
    foreignKeys: {
      fk_distance_request: {
        name: 'fk_distance_request',
        entity: 'Request',
        entityKey: 'idRequest',
        foreignKey: 'requestId',
      },
      fk_distance_travel: {
        name: 'fk_distance_travel',
        entity: 'Travel',
        entityKey: 'idTravel',
        foreignKey: 'travelId',
      },
    },
  },
})
export class Distance extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idDistance?: number;

  @property({
    type: 'string',
    required: true,
  })
  origin: string;

  @property({
    type: 'string',
    required: true,
  })
  finish: string;

  @property({
    type: 'number',
    required: true,
  })
  longitude: number;


  @hasOne(() => Request)
  request: Request;

  @property({
    type: 'number',
  })
  requestId?: number;

  @property({
    type: 'number',
  })
  travelId?: number;

  @hasOne(() => Travel)
  travel: Travel;

  constructor(data?: Partial<Distance>) {
    super(data);
  }
}

export interface DistanceRelations {
  // describe navigational properties here
}

export type DistanceWithRelations = Distance & DistanceRelations;
