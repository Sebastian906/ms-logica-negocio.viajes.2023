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
import {PayType} from '../models';
import {PayTypeRepository} from '../repositories';

export class PayTypeController {
  constructor(
    @repository(PayTypeRepository)
    public payTypeRepository : PayTypeRepository,
  ) {}

  @post('/pay-type')
  @response(200, {
    description: 'PayType model instance',
    content: {'application/json': {schema: getModelSchemaRef(PayType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayType, {
            title: 'NewPayType',
            exclude: ['idType'],
          }),
        },
      },
    })
    payType: Omit<PayType, 'idType'>,
  ): Promise<PayType> {
    return this.payTypeRepository.create(payType);
  }

  @get('/pay-type/count')
  @response(200, {
    description: 'PayType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PayType) where?: Where<PayType>,
  ): Promise<Count> {
    return this.payTypeRepository.count(where);
  }

  @get('/pay-type')
  @response(200, {
    description: 'Array of PayType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PayType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PayType) filter?: Filter<PayType>,
  ): Promise<PayType[]> {
    return this.payTypeRepository.find(filter);
  }

  @patch('/pay-type')
  @response(200, {
    description: 'PayType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayType, {partial: true}),
        },
      },
    })
    payType: PayType,
    @param.where(PayType) where?: Where<PayType>,
  ): Promise<Count> {
    return this.payTypeRepository.updateAll(payType, where);
  }

  @get('/pay-type/{id}')
  @response(200, {
    description: 'PayType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PayType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PayType, {exclude: 'where'}) filter?: FilterExcludingWhere<PayType>
  ): Promise<PayType> {
    return this.payTypeRepository.findById(id, filter);
  }

  @patch('/pay-type/{id}')
  @response(204, {
    description: 'PayType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayType, {partial: true}),
        },
      },
    })
    payType: PayType,
  ): Promise<void> {
    await this.payTypeRepository.updateById(id, payType);
  }

  @put('/pay-type/{id}')
  @response(204, {
    description: 'PayType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() payType: PayType,
  ): Promise<void> {
    await this.payTypeRepository.replaceById(id, payType);
  }

  @del('/pay-type/{id}')
  @response(204, {
    description: 'PayType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.payTypeRepository.deleteById(id);
  }
}
