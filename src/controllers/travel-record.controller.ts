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
  Travel,
  Record,
} from '../models';
import {TravelRepository} from '../repositories';

export class TravelRecordController {
  constructor(
    @repository(TravelRepository) protected travelRepository: TravelRepository,
  ) { }

  @get('/travels/{id}/record', {
    responses: {
      '200': {
        description: 'Travel has one Record',
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
    return this.travelRepository.record(id).get(filter);
  }

  @post('/travels/{id}/record', {
    responses: {
      '200': {
        description: 'Travel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Record)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Travel.prototype.idTravel,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {
            title: 'NewRecordInTravel',
            exclude: ['idRecord'],
            optional: ['travelId']
          }),
        },
      },
    }) record: Omit<Record, 'idRecord'>,
  ): Promise<Record> {
    return this.travelRepository.record(id).create(record);
  }

  @patch('/travels/{id}/record', {
    responses: {
      '200': {
        description: 'Travel.Record PATCH success count',
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
    return this.travelRepository.record(id).patch(record, where);
  }

  @del('/travels/{id}/record', {
    responses: {
      '200': {
        description: 'Travel.Record DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Record)) where?: Where<Record>,
  ): Promise<Count> {
    return this.travelRepository.record(id).delete(where);
  }
}
