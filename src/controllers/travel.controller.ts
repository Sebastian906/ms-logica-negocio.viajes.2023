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
import {Travel} from '../models';
import {TravelRepository} from '../repositories';

export class TravelController {
  constructor(
    @repository(TravelRepository)
    public travelRepository : TravelRepository,
  ) {}

  @post('/travel')
  @response(200, {
    description: 'Travel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Travel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {
            title: 'NewTravel',
            exclude: ['idTravel'],
          }),
        },
      },
    })
    travel: Omit<Travel, 'idTravel'>,
  ): Promise<Travel> {
    return this.travelRepository.create(travel);
  }

  @get('/travel/count')
  @response(200, {
    description: 'Travel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Travel) where?: Where<Travel>,
  ): Promise<Count> {
    return this.travelRepository.count(where);
  }

  @get('/travel')
  @response(200, {
    description: 'Array of Travel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Travel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Travel) filter?: Filter<Travel>,
  ): Promise<Travel[]> {
    return this.travelRepository.find(filter);
  }

  @patch('/travel')
  @response(200, {
    description: 'Travel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {partial: true}),
        },
      },
    })
    travel: Travel,
    @param.where(Travel) where?: Where<Travel>,
  ): Promise<Count> {
    return this.travelRepository.updateAll(travel, where);
  }

  @get('/travel/{id}')
  @response(200, {
    description: 'Travel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Travel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Travel, {exclude: 'where'}) filter?: FilterExcludingWhere<Travel>
  ): Promise<Travel> {
    return this.travelRepository.findById(id, filter);
  }

  @patch('/travel/{id}')
  @response(204, {
    description: 'Travel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {partial: true}),
        },
      },
    })
    travel: Travel,
  ): Promise<void> {
    await this.travelRepository.updateById(id, travel);
  }

  @put('/travel/{id}')
  @response(204, {
    description: 'Travel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() travel: Travel,
  ): Promise<void> {
    await this.travelRepository.replaceById(id, travel);
  }

  @del('/travel/{id}')
  @response(204, {
    description: 'Travel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.travelRepository.deleteById(id);
  }
}
