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
  Request,
  Driver,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestDriverController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/drivers', {
    responses: {
      '200': {
        description: 'Array of Request has many Driver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Driver>,
  ): Promise<Driver[]> {
    return this.requestRepository.drivers(id).find(filter);
  }

  @post('/requests/{id}/drivers', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Driver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Request.prototype.idRequest,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {
            title: 'NewDriverInRequest',
            exclude: ['idDriver'],
            optional: ['requestId']
          }),
        },
      },
    }) driver: Omit<Driver, 'idDriver'>,
  ): Promise<Driver> {
    return this.requestRepository.drivers(id).create(driver);
  }

  @patch('/requests/{id}/drivers', {
    responses: {
      '200': {
        description: 'Request.Driver PATCH success count',
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
    return this.requestRepository.drivers(id).patch(driver, where);
  }

  @del('/requests/{id}/drivers', {
    responses: {
      '200': {
        description: 'Request.Driver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.requestRepository.drivers(id).delete(where);
  }
}
