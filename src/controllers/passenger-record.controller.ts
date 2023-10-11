import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Passenger,
  Record,
} from '../models';
import {PassengerRepository} from '../repositories';

export class PassengerRecordController {
  constructor(
    @repository(PassengerRepository) protected passengerRepository: PassengerRepository,
  ) { }

  @get('/passengers/{id}/record', {
    responses: {
      '200': {
        description: 'Passenger has one Record',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Record),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Record>,
  ): Promise<Record> {
    return this.passengerRepository.record(id).get(filter);
  }

  @post('/passengers/{id}/record', {
    responses: {
      '200': {
        description: 'Passenger model instance',
        content: {'application/json': {schema: getModelSchemaRef(Record)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Passenger.prototype.idPassenger,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {
            title: 'NewRecordInPassenger',
            exclude: ['idRecord'],
            optional: ['passengerId']
          }),
        },
      },
    }) record: Omit<Record, 'idRecord'>,
  ): Promise<Record> {
    return this.passengerRepository.record(id).create(record);
  }

  @patch('/passengers/{id}/record', {
    responses: {
      '200': {
        description: 'Passenger.Record PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {partial: true}),
        },
      },
    })
    record: Partial<Record>,
    @param.query.object('where', getWhereSchemaFor(Record)) where?: Where<Record>,
  ): Promise<Count> {
    return this.passengerRepository.record(id).patch(record, where);
  }

  @del('/passengers/{id}/record', {
    responses: {
      '200': {
        description: 'Passenger.Record DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Record)) where?: Where<Record>,
  ): Promise<Count> {
    return this.passengerRepository.record(id).delete(where);
  }
}
