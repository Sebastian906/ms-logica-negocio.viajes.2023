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
  Status,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestStatusController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/status', {
    responses: {
      '200': {
        description: 'Request has one Status',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Status),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Status>,
  ): Promise<Status> {
    return this.requestRepository.status(id).get(filter);
  }

  @post('/requests/{id}/status', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Status)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Request.prototype.idRequest,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatusInRequest',
            exclude: ['idState'],
            optional: ['requestId']
          }),
        },
      },
    }) status: Omit<Status, 'idState'>,
  ): Promise<Status> {
    return this.requestRepository.status(id).create(status);
  }

  @patch('/requests/{id}/status', {
    responses: {
      '200': {
        description: 'Request.Status PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Partial<Status>,
    @param.query.object('where', getWhereSchemaFor(Status)) where?: Where<Status>,
  ): Promise<Count> {
    return this.requestRepository.status(id).patch(status, where);
  }

  @del('/requests/{id}/status', {
    responses: {
      '200': {
        description: 'Request.Status DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Status)) where?: Where<Status>,
  ): Promise<Count> {
    return this.requestRepository.status(id).delete(where);
  }
}
