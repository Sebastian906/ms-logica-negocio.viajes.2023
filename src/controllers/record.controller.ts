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
import {Record} from '../models';
import {RecordRepository} from '../repositories';

export class RecordController {
  constructor(
    @repository(RecordRepository)
    public recordRepository : RecordRepository,
  ) {}

  @post('/record')
  @response(200, {
    description: 'Record model instance',
    content: {'application/json': {schema: getModelSchemaRef(Record)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {
            title: 'NewRecord',
            exclude: ['idRecord'],
          }),
        },
      },
    })
    record: Omit<Record, 'idRecord'>,
  ): Promise<Record> {
    return this.recordRepository.create(record);
  }

  @get('/record/count')
  @response(200, {
    description: 'Record model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Record) where?: Where<Record>,
  ): Promise<Count> {
    return this.recordRepository.count(where);
  }

  @get('/record')
  @response(200, {
    description: 'Array of Record model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Record, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Record) filter?: Filter<Record>,
  ): Promise<Record[]> {
    return this.recordRepository.find(filter);
  }

  @patch('/record')
  @response(200, {
    description: 'Record PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {partial: true}),
        },
      },
    })
    record: Record,
    @param.where(Record) where?: Where<Record>,
  ): Promise<Count> {
    return this.recordRepository.updateAll(record, where);
  }

  @get('/record/{id}')
  @response(200, {
    description: 'Record model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Record, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Record, {exclude: 'where'}) filter?: FilterExcludingWhere<Record>
  ): Promise<Record> {
    return this.recordRepository.findById(id, filter);
  }

  @patch('/record/{id}')
  @response(204, {
    description: 'Record PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Record, {partial: true}),
        },
      },
    })
    record: Record,
  ): Promise<void> {
    await this.recordRepository.updateById(id, record);
  }

  @put('/record/{id}')
  @response(204, {
    description: 'Record PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() record: Record,
  ): Promise<void> {
    await this.recordRepository.replaceById(id, record);
  }

  @del('/record/{id}')
  @response(204, {
    description: 'Record DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordRepository.deleteById(id);
  }
}
