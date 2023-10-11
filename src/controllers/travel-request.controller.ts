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
  Request,
} from '../models';
import {TravelRepository} from '../repositories';

export class TravelRequestController {
  constructor(
    @repository(TravelRepository) protected travelRepository: TravelRepository,
  ) { }

  @get('/travels/{id}/request', {
    responses: {
      '200': {
        description: 'Travel has one Request',
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
    return this.travelRepository.request(id).get(filter);
  }

  @post('/travels/{id}/request', {
    responses: {
      '200': {
        description: 'Travel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Travel.prototype.idTravel,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInTravel',
            exclude: ['idRequest'],
            optional: ['travelId']
          }),
        },
      },
    }) request: Omit<Request, 'idRequest'>,
  ): Promise<Request> {
    return this.travelRepository.request(id).create(request);
  }

  @patch('/travels/{id}/request', {
    responses: {
      '200': {
        description: 'Travel.Request PATCH success count',
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
    return this.travelRepository.request(id).patch(request, where);
  }

  @del('/travels/{id}/request', {
    responses: {
      '200': {
        description: 'Travel.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.travelRepository.request(id).delete(where);
  }
}
