import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Distance} from '../models';
import {DistanceRepository} from '../repositories';

export class DistanceController {
  constructor(
    @repository(DistanceRepository)
    public distanceRepository : DistanceRepository,
  ) {}

  @post('/distance')
  @response(200, {
    description: 'Distance model instance',
    content: {'application/json': {schema: getModelSchemaRef(Distance)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {
            title: 'NewDistance',
            exclude: ['idDistance'],
          }),
        },
      },
    })
    distance: Omit<Distance, 'idDistance'>,
  ): Promise<Distance> {
    return this.distanceRepository.create(distance);
  }

  @get('/distance/count')
  @response(200, {
    description: 'Distance model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Distance) where?: Where<Distance>,
  ): Promise<Count> {
    return this.distanceRepository.count(where);
  }

  @get('/distance')
  @response(200, {
    description: 'Array of Distance model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Distance, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Distance) filter?: Filter<Distance>,
  ): Promise<Distance[]> {
    return this.distanceRepository.find(filter);
  }

  @patch('/distance')
  @response(200, {
    description: 'Distance PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {partial: true}),
        },
      },
    })
    distance: Distance,
    @param.where(Distance) where?: Where<Distance>,
  ): Promise<Count> {
    return this.distanceRepository.updateAll(distance, where);
  }

  @get('/distance/{id}')
  @response(200, {
    description: 'Distance model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Distance, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Distance, {exclude: 'where'}) filter?: FilterExcludingWhere<Distance>
  ): Promise<Distance> {
    return this.distanceRepository.findById(id, filter);
  }

  @patch('/distance/{id}')
  @response(204, {
    description: 'Distance PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {partial: true}),
        },
      },
    })
    distance: Distance,
  ): Promise<void> {
    await this.distanceRepository.updateById(id, distance);
  }

  @put('/distance/{id}')
  @response(204, {
    description: 'Distance PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() distance: Distance,
  ): Promise<void> {
    await this.distanceRepository.replaceById(id, distance);
  }

  @del('/distance/{id}')
  @response(204, {
    description: 'Distance DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.distanceRepository.deleteById(id);
  }
}
