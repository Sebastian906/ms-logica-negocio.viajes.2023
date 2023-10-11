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
  Driver,
} from '../models';
import {RecordRepository} from '../repositories';

export class RecordDriverController {
  constructor(
    @repository(RecordRepository) protected recordRepository: RecordRepository,
  ) { }

  @get('/records/{id}/driver', {
    responses: {
      '200': {
        description: 'Record has one Driver',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Driver>,
  ): Promise<Driver> {
    return this.recordRepository.driver(id).get(filter);
  }

  @post('/records/{id}/driver', {
    responses: {
      '200': {
        description: 'Record model instance',
        content: {'application/json': {schema: getModelSchemaRef(Driver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Record.prototype.idRecord,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {
            title: 'NewDriverInRecord',
            exclude: ['idDriver'],
            optional: ['recordId']
          }),
        },
      },
    }) driver: Omit<Driver, 'idDriver'>,
  ): Promise<Driver> {
    return this.recordRepository.driver(id).create(driver);
  }

  @patch('/records/{id}/driver', {
    responses: {
      '200': {
        description: 'Record.Driver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Partial<Driver>,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.recordRepository.driver(id).patch(driver, where);
  }

  @del('/records/{id}/driver', {
    responses: {
      '200': {
        description: 'Record.Driver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.recordRepository.driver(id).delete(where);
  }
}
