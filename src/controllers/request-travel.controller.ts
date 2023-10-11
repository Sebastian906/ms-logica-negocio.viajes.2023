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
  Travel,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestTravelController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/travel', {
    responses: {
      '200': {
        description: 'Request has one Travel',
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
    return this.requestRepository.travel(id).get(filter);
  }

  @post('/requests/{id}/travel', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Travel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Request.prototype.idRequest,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {
            title: 'NewTravelInRequest',
            exclude: ['idTravel'],
            optional: ['requestId']
          }),
        },
      },
    }) travel: Omit<Travel, 'idTravel'>,
  ): Promise<Travel> {
    return this.requestRepository.travel(id).create(travel);
  }

  @patch('/requests/{id}/travel', {
    responses: {
      '200': {
        description: 'Request.Travel PATCH success count',
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
    return this.requestRepository.travel(id).patch(travel, where);
  }

  @del('/requests/{id}/travel', {
    responses: {
      '200': {
        description: 'Request.Travel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Travel)) where?: Where<Travel>,
  ): Promise<Count> {
    return this.requestRepository.travel(id).delete(where);
  }
}
