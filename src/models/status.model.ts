import {Entity, model, property, hasOne} from '@loopback/repository';
import {Request} from './request.model';

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

  @hasOne(() => Request)
  request: Request;

  @property({
    type: 'number',
  })
  requestId?: number;

  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
