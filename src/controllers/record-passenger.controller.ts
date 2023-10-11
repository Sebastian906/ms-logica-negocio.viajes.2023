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
  Record,
  Passenger,
} from '../models';
import {RecordRepository} from '../repositories';

export class RecordPassengerController {
  constructor(
    @repository(RecordRepository) protected recordRepository: RecordRepository,
  ) { }

  @get('/records/{id}/passenger', {
    responses: {
      '200': {
        description: 'Record has one Passenger',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Passenger),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Passenger>,
  ): Promise<Passenger> {
    return this.recordRepository.passenger(id).get(filter);
  }

  @post('/records/{id}/passenger', {
    responses: {
      '200': {
        description: 'Record model instance',
        content: {'application/json': {schema: getModelSchemaRef(Passenger)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Record.prototype.idRecord,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Passenger, {
            title: 'NewPassengerInRecord',
            exclude: ['idPassenger'],
            optional: ['recordId']
          }),
        },
      },
    }) passenger: Omit<Passenger, 'idPassenger'>,
  ): Promise<Passenger> {
    return this.recordRepository.passenger(id).create(passenger);
  }

  @patch('/records/{id}/passenger', {
    responses: {
      '200': {
        description: 'Record.Passenger PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Passenger, {partial: true}),
        },
      },
    })
    passenger: Partial<Passenger>,
    @param.query.object('where', getWhereSchemaFor(Passenger)) where?: Where<Passenger>,
  ): Promise<Count> {
    return this.recordRepository.passenger(id).patch(passenger, where);
  }

  @del('/records/{id}/passenger', {
    responses: {
      '200': {
        description: 'Record.Passenger DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Passenger)) where?: Where<Passenger>,
  ): Promise<Count> {
    return this.recordRepository.passenger(id).delete(where);
  }
}
