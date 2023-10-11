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
  Distance,
} from '../models';
import {TravelRepository} from '../repositories';

export class TravelDistanceController {
  constructor(
    @repository(TravelRepository) protected travelRepository: TravelRepository,
  ) { }

  @get('/travels/{id}/distance', {
    responses: {
      '200': {
        description: 'Travel has one Distance',
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
    return this.travelRepository.distance(id).get(filter);
  }

  @post('/travels/{id}/distance', {
    responses: {
      '200': {
        description: 'Travel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Distance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Travel.prototype.idTravel,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {
            title: 'NewDistanceInTravel',
            exclude: ['idDistance'],
            optional: ['travelId']
          }),
        },
      },
    }) distance: Omit<Distance, 'idDistance'>,
  ): Promise<Distance> {
    return this.travelRepository.distance(id).create(distance);
  }

  @patch('/travels/{id}/distance', {
    responses: {
      '200': {
        description: 'Travel.Distance PATCH success count',
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
    return this.travelRepository.distance(id).patch(distance, where);
  }

  @del('/travels/{id}/distance', {
    responses: {
      '200': {
        description: 'Travel.Distance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Distance)) where?: Where<Distance>,
  ): Promise<Count> {
    return this.travelRepository.distance(id).delete(where);
  }
}
