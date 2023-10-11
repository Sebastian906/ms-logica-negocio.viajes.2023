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
  Distance,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestDistanceController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/distance', {
    responses: {
      '200': {
        description: 'Request has one Distance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Distance),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Distance>,
  ): Promise<Distance> {
    return this.requestRepository.distance(id).get(filter);
  }

  @post('/requests/{id}/distance', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Distance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Request.prototype.idRequest,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {
            title: 'NewDistanceInRequest',
            exclude: ['idDistance'],
            optional: ['requestId']
          }),
        },
      },
    }) distance: Omit<Distance, 'idDistance'>,
  ): Promise<Distance> {
    return this.requestRepository.distance(id).create(distance);
  }

  @patch('/requests/{id}/distance', {
    responses: {
      '200': {
        description: 'Request.Distance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {partial: true}),
        },
      },
    })
    distance: Partial<Distance>,
    @param.query.object('where', getWhereSchemaFor(Distance)) where?: Where<Distance>,
  ): Promise<Count> {
    return this.requestRepository.distance(id).patch(distance, where);
  }

  @del('/requests/{id}/distance', {
    responses: {
      '200': {
        description: 'Request.Distance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Distance)) where?: Where<Distance>,
  ): Promise<Count> {
    return this.requestRepository.distance(id).delete(where);
  }
}
