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
  Distance,
  Request,
} from '../models';
import {DistanceRepository} from '../repositories';

export class DistanceRequestController {
  constructor(
    @repository(DistanceRepository) protected distanceRepository: DistanceRepository,
  ) { }

  @get('/distances/{id}/request', {
    responses: {
      '200': {
        description: 'Distance has one Request',
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
    return this.distanceRepository.request(id).get(filter);
  }

  @post('/distances/{id}/request', {
    responses: {
      '200': {
        description: 'Distance model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Distance.prototype.idDistance,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInDistance',
            exclude: ['idRequest'],
            optional: ['distanceId']
          }),
        },
      },
    }) request: Omit<Request, 'idRequest'>,
  ): Promise<Request> {
    return this.distanceRepository.request(id).create(request);
  }

  @patch('/distances/{id}/request', {
    responses: {
      '200': {
        description: 'Distance.Request PATCH success count',
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
    return this.distanceRepository.request(id).patch(request, where);
  }

  @del('/distances/{id}/request', {
    responses: {
      '200': {
        description: 'Distance.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.distanceRepository.request(id).delete(where);
  }
}
