import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Travel>) {
    super(data);
  }
}

export interface TravelRelations {
  // describe navigational properties here
}

export type TravelWithRelations = Travel & TravelRelations;
