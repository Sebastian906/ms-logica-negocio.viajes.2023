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
  Status,
  Request,
} from '../models';
import {StatusRepository} from '../repositories';

export class StatusRequestController {
  constructor(
    @repository(StatusRepository) protected statusRepository: StatusRepository,
  ) { }

  @get('/statuses/{id}/request', {
    responses: {
      '200': {
        description: 'Status has one Request',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Request>,
  ): Promise<Request> {
    return this.statusRepository.request(id).get(filter);
  }

  @post('/statuses/{id}/request', {
    responses: {
      '200': {
        description: 'Status model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Status.prototype.idState,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInStatus',
            exclude: ['idRequest'],
            optional: ['statusId']
          }),
        },
      },
    }) request: Omit<Request, 'idRequest'>,
  ): Promise<Request> {
    return this.statusRepository.request(id).create(request);
  }

  @patch('/statuses/{id}/request', {
    responses: {
      '200': {
        description: 'Status.Request PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {partial: true}),
        },
      },
    })
    request: Partial<Request>,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.statusRepository.request(id).patch(request, where);
  }

  @del('/statuses/{id}/request', {
    responses: {
      '200': {
        description: 'Status.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.statusRepository.request(id).delete(where);
  }
}
