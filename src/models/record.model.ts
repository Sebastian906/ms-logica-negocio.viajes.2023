import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Record>) {
    super(data);
  }
}

export interface RecordRelations {
  // describe navigational properties here
}

export type RecordWithRelations = Record & RecordRelations;
