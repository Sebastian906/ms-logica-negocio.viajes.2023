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
  Travel,
} from '../models';
import {DistanceRepository} from '../repositories';

export class DistanceTravelController {
  constructor(
    @repository(DistanceRepository) protected distanceRepository: DistanceRepository,
  ) { }

  @get('/distances/{id}/travel', {
    responses: {
      '200': {
        description: 'Distance has one Travel',
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
    return this.distanceRepository.travel(id).get(filter);
  }

  @post('/distances/{id}/travel', {
    responses: {
      '200': {
        description: 'Distance model instance',
        content: {'application/json': {schema: getModelSchemaRef(Travel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Distance.prototype.idDistance,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {
            title: 'NewTravelInDistance',
            exclude: ['idTravel'],
            optional: ['distanceId']
          }),
        },
      },
    }) travel: Omit<Travel, 'idTravel'>,
  ): Promise<Travel> {
    return this.distanceRepository.travel(id).create(travel);
  }

  @patch('/distances/{id}/travel', {
    responses: {
      '200': {
        description: 'Distance.Travel PATCH success count',
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
    return this.distanceRepository.travel(id).patch(travel, where);
  }

  @del('/distances/{id}/travel', {
    responses: {
      '200': {
        description: 'Distance.Travel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Travel)) where?: Where<Travel>,
  ): Promise<Count> {
    return this.distanceRepository.travel(id).delete(where);
  }
}
