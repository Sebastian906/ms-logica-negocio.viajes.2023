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
import {Status} from '../models';
import {StatusRepository} from '../repositories';

export class StatusController {
  constructor(
    @repository(StatusRepository)
    public statusRepository : StatusRepository,
  ) {}

  @post('/state')
  @response(200, {
    description: 'Status model instance',
    content: {'application/json': {schema: getModelSchemaRef(Status)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatus',
            exclude: ['idState'],
          }),
        },
      },
    })
    status: Omit<Status, 'idState'>,
  ): Promise<Status> {
    return this.statusRepository.create(status);
  }

  @get('/state/count')
  @response(200, {
    description: 'Status model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Status) where?: Where<Status>,
  ): Promise<Count> {
    return this.statusRepository.count(where);
  }

  @get('/state')
  @response(200, {
    description: 'Array of Status model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Status, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Status) filter?: Filter<Status>,
  ): Promise<Status[]> {
    return this.statusRepository.find(filter);
  }

  @patch('/state')
  @response(200, {
    description: 'Status PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Status,
    @param.where(Status) where?: Where<Status>,
  ): Promise<Count> {
    return this.statusRepository.updateAll(status, where);
  }

  @get('/state/{id}')
  @response(200, {
    description: 'Status model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Status, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Status, {exclude: 'where'}) filter?: FilterExcludingWhere<Status>
  ): Promise<Status> {
    return this.statusRepository.findById(id, filter);
  }

  @patch('/state/{id}')
  @response(204, {
    description: 'Status PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Status,
  ): Promise<void> {
    await this.statusRepository.updateById(id, status);
  }

  @put('/state/{id}')
  @response(204, {
    description: 'Status PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() status: Status,
  ): Promise<void> {
    await this.statusRepository.replaceById(id, status);
  }

  @del('/state/{id}')
  @response(204, {
    description: 'Status DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.statusRepository.deleteById(id);
  }
}
