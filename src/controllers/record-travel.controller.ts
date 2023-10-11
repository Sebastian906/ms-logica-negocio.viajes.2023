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
  Travel,
} from '../models';
import {RecordRepository} from '../repositories';

export class RecordTravelController {
  constructor(
    @repository(RecordRepository) protected recordRepository: RecordRepository,
  ) { }

  @get('/records/{id}/travel', {
    responses: {
      '200': {
        description: 'Record has one Travel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Travel),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Travel>,
  ): Promise<Travel> {
    return this.recordRepository.travel(id).get(filter);
  }

  @post('/records/{id}/travel', {
    responses: {
      '200': {
        description: 'Record model instance',
        content: {'application/json': {schema: getModelSchemaRef(Travel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Record.prototype.idRecord,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {
            title: 'NewTravelInRecord',
            exclude: ['idTravel'],
            optional: ['recordId']
          }),
        },
      },
    }) travel: Omit<Travel, 'idTravel'>,
  ): Promise<Travel> {
    return this.recordRepository.travel(id).create(travel);
  }

  @patch('/records/{id}/travel', {
    responses: {
      '200': {
        description: 'Record.Travel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {partial: true}),
        },
      },
    })
    travel: Partial<Travel>,
    @param.query.object('where', getWhereSchemaFor(Travel)) where?: Where<Travel>,
  ): Promise<Count> {
    return this.recordRepository.travel(id).patch(travel, where);
  }

  @del('/records/{id}/travel', {
    responses: {
      '200': {
        description: 'Record.Travel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Travel)) where?: Where<Travel>,
  ): Promise<Count> {
    return this.recordRepository.travel(id).delete(where);
  }
}
