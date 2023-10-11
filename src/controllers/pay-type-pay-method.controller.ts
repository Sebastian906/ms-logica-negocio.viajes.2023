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
  PayType,
  PayMethod,
} from '../models';
import {PayTypeRepository} from '../repositories';

export class PayTypePayMethodController {
  constructor(
    @repository(PayTypeRepository) protected payTypeRepository: PayTypeRepository,
  ) { }

  @get('/pay-types/{id}/pay-method', {
    responses: {
      '200': {
        description: 'PayType has one PayMethod',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PayMethod),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PayMethod>,
  ): Promise<PayMethod> {
    return this.payTypeRepository.payMethod(id).get(filter);
  }

  @post('/pay-types/{id}/pay-method', {
    responses: {
      '200': {
        description: 'PayType model instance',
        content: {'application/json': {schema: getModelSchemaRef(PayMethod)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PayType.prototype.idType,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayMethod, {
            title: 'NewPayMethodInPayType',
            exclude: ['idPayMethod'],
            optional: ['payTypeId']
          }),
        },
      },
    }) payMethod: Omit<PayMethod, 'idPayMethod'>,
  ): Promise<PayMethod> {
    return this.payTypeRepository.payMethod(id).create(payMethod);
  }

  @patch('/pay-types/{id}/pay-method', {
    responses: {
      '200': {
        description: 'PayType.PayMethod PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayMethod, {partial: true}),
        },
      },
    })
    payMethod: Partial<PayMethod>,
    @param.query.object('where', getWhereSchemaFor(PayMethod)) where?: Where<PayMethod>,
  ): Promise<Count> {
    return this.payTypeRepository.payMethod(id).patch(payMethod, where);
  }

  @del('/pay-types/{id}/pay-method', {
    responses: {
      '200': {
        description: 'PayType.PayMethod DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PayMethod)) where?: Where<PayMethod>,
  ): Promise<Count> {
    return this.payTypeRepository.payMethod(id).delete(where);
  }
}
