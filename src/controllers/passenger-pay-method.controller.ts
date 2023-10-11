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
  Passenger,
  PayMethod,
} from '../models';
import {PassengerRepository} from '../repositories';

export class PassengerPayMethodController {
  constructor(
    @repository(PassengerRepository) protected passengerRepository: PassengerRepository,
  ) { }

  @get('/passengers/{id}/pay-methods', {
    responses: {
      '200': {
        description: 'Array of Passenger has many PayMethod',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PayMethod)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PayMethod>,
  ): Promise<PayMethod[]> {
    return this.passengerRepository.payMethods(id).find(filter);
  }

  @post('/passengers/{id}/pay-methods', {
    responses: {
      '200': {
        description: 'Passenger model instance',
        content: {'application/json': {schema: getModelSchemaRef(PayMethod)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Passenger.prototype.idPassenger,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PayMethod, {
            title: 'NewPayMethodInPassenger',
            exclude: ['idPayMethod'],
            optional: ['passengerId']
          }),
        },
      },
    }) payMethod: Omit<PayMethod, 'idPayMethod'>,
  ): Promise<PayMethod> {
    return this.passengerRepository.payMethods(id).create(payMethod);
  }

  @patch('/passengers/{id}/pay-methods', {
    responses: {
      '200': {
        description: 'Passenger.PayMethod PATCH success count',
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
    return this.passengerRepository.payMethods(id).patch(payMethod, where);
  }

  @del('/passengers/{id}/pay-methods', {
    responses: {
      '200': {
        description: 'Passenger.PayMethod DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PayMethod)) where?: Where<PayMethod>,
  ): Promise<Count> {
    return this.passengerRepository.payMethods(id).delete(where);
  }
}
