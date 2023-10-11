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
  Driver,
  Record,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverRecordController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/record', {
    responses: {
      '200': {
        description: 'Driver has one Record',
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
    return this.driverRepository.record(id).get(filter);
  }

  @post('/drivers/{id}/record', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Record)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Driver.prototype.idDriver,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {
            title: 'NewRecordInDriver',
            exclude: ['idRecord'],
            optional: ['driverId']
          }),
        },
      },
    }) record: Omit<Record, 'idRecord'>,
  ): Promise<Record> {
    return this.driverRepository.record(id).create(record);
  }

  @patch('/drivers/{id}/record', {
    responses: {
      '200': {
        description: 'Driver.Record PATCH success count',
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
    return this.driverRepository.record(id).patch(record, where);
  }

  @del('/drivers/{id}/record', {
    responses: {
      '200': {
        description: 'Driver.Record DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Record)) where?: Where<Record>,
  ): Promise<Count> {
    return this.driverRepository.record(id).delete(where);
  }
}
