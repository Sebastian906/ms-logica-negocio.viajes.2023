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
import {PayMethod} from '../models';
import {PayMethodRepository} from '../repositories';

export class PayMethodController {
  constructor(
    @repository(PayMethodRepository)
    public payMethodRepository : PayMethodRepository,
  ) {}

  @post('/pay-method')
  @response(200, {
    description: 'PayMethod model instance',
    content: {'application/json': {schema: getModelSchemaRef(PayMethod)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayMethod, {
            title: 'NewPayMethod',
            exclude: ['idPayMethod'],
          }),
        },
      },
    })
    payMethod: Omit<PayMethod, 'idPayMethod'>,
  ): Promise<PayMethod> {
    return this.payMethodRepository.create(payMethod);
  }

  @get('/pay-method/count')
  @response(200, {
    description: 'PayMethod model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PayMethod) where?: Where<PayMethod>,
  ): Promise<Count> {
    return this.payMethodRepository.count(where);
  }

  @get('/pay-method')
  @response(200, {
    description: 'Array of PayMethod model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PayMethod, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PayMethod) filter?: Filter<PayMethod>,
  ): Promise<PayMethod[]> {
    return this.payMethodRepository.find(filter);
  }

  @patch('/pay-method')
  @response(200, {
    description: 'PayMethod PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayMethod, {partial: true}),
        },
      },
    })
    payMethod: PayMethod,
    @param.where(PayMethod) where?: Where<PayMethod>,
  ): Promise<Count> {
    return this.payMethodRepository.updateAll(payMethod, where);
  }

  @get('/pay-method/{id}')
  @response(200, {
    description: 'PayMethod model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PayMethod, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PayMethod, {exclude: 'where'}) filter?: FilterExcludingWhere<PayMethod>
  ): Promise<PayMethod> {
    return this.payMethodRepository.findById(id, filter);
  }

  @patch('/pay-method/{id}')
  @response(204, {
    description: 'PayMethod PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayMethod, {partial: true}),
        },
      },
    })
    payMethod: PayMethod,
  ): Promise<void> {
    await this.payMethodRepository.updateById(id, payMethod);
  }

  @put('/pay-method/{id}')
  @response(204, {
    description: 'PayMethod PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() payMethod: PayMethod,
  ): Promise<void> {
    await this.payMethodRepository.replaceById(id, payMethod);
  }

  @del('/pay-method/{id}')
  @response(204, {
    description: 'PayMethod DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.payMethodRepository.deleteById(id);
  }
}
