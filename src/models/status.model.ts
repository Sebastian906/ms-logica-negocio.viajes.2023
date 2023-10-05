import {Entity, model, property} from '@loopback/repository';

@model()
export class Status extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idState?: number;

  @property({
    type: 'string',
    required: true,
  })
  stateRequest: string;

  @property({
    type: 'number',
    required: true,
  })
  idRequest: number;


  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
