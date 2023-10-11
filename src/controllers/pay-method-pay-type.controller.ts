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
  PayMethod,
  PayType,
} from '../models';
import {PayMethodRepository} from '../repositories';

export class PayMethodPayTypeController {
  constructor(
    @repository(PayMethodRepository) protected payMethodRepository: PayMethodRepository,
  ) { }

  @get('/pay-methods/{id}/pay-type', {
    responses: {
      '200': {
        description: 'PayMethod has one PayType',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PayType),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PayType>,
  ): Promise<PayType> {
    return this.payMethodRepository.payType(id).get(filter);
  }

  @post('/pay-methods/{id}/pay-type', {
    responses: {
      '200': {
        description: 'PayMethod model instance',
        content: {'application/json': {schema: getModelSchemaRef(PayType)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PayMethod.prototype.idPayMethod,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayType, {
            title: 'NewPayTypeInPayMethod',
            exclude: ['idType'],
            optional: ['payMethodId']
          }),
        },
      },
    }) payType: Omit<PayType, 'idType'>,
  ): Promise<PayType> {
    return this.payMethodRepository.payType(id).create(payType);
  }

  @patch('/pay-methods/{id}/pay-type', {
    responses: {
      '200': {
        description: 'PayMethod.PayType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayType, {partial: true}),
        },
      },
    })
    payType: Partial<PayType>,
    @param.query.object('where', getWhereSchemaFor(PayType)) where?: Where<PayType>,
  ): Promise<Count> {
    return this.payMethodRepository.payType(id).patch(payType, where);
  }

  @del('/pay-methods/{id}/pay-type', {
    responses: {
      '200': {
        description: 'PayMethod.PayType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PayType)) where?: Where<PayType>,
  ): Promise<Count> {
    return this.payMethodRepository.payType(id).delete(where);
  }
}
