import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Distance>) {
    super(data);
  }
}

export interface DistanceRelations {
  // describe navigational properties here
}

export type DistanceWithRelations = Distance & DistanceRelations;
