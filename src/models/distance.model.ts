import {Entity, model, property, hasOne} from '@loopback/repository';
import {Request} from './request.model';
import {Travel} from './travel.model';

@model()
export class Distance extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idDistance?: number;

  @property({
    type: 'geopoint',
    required: true,
  })
  origin: string;

  @property({
    type: 'geopoint',
    required: true,
  })
  finish: string;

  @property({
    type: 'number',
    required: true,
  })
  longitude: number;

  @property({
    type: 'number',
    required: true,
  })
  idRequest: number;

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
