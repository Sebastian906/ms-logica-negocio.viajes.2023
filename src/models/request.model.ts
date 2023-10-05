import {Entity, model, property} from '@loopback/repository';

@model()
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
    type: 'geopoint',
    required: true,
  })
  pickup: string;

  @property({
    type: 'geopoint',
    required: true,
  })
  destination: string;

  @property({
    type: 'number',
    required: true,
  })
  idDriver: number;

  @property({
    type: 'number',
    required: true,
  })
  idPassenger: number;


  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
