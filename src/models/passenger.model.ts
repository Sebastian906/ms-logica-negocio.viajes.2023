import {Entity, model, property} from '@loopback/repository';

@model()
export class Passenger extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPassenger?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
    required: true,
  })
  userPhoto: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;


  constructor(data?: Partial<Passenger>) {
    super(data);
  }
}

export interface PassengerRelations {
  // describe navigational properties here
}

export type PassengerWithRelations = Passenger & PassengerRelations;
