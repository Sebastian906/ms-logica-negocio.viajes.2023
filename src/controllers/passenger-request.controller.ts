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
  Request,
} from '../models';
import {PassengerRepository} from '../repositories';

export class PassengerRequestController {
  constructor(
    @repository(PassengerRepository) protected passengerRepository: PassengerRepository,
  ) { }

  @get('/passengers/{id}/requests', {
    responses: {
      '200': {
        description: 'Array of Passenger has many Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Request)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Request>,
  ): Promise<Request[]> {
    return this.passengerRepository.requests(id).find(filter);
  }

  @post('/passengers/{id}/requests', {
    responses: {
      '200': {
        description: 'Passenger model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Passenger.prototype.idPassenger,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequestInPassenger',
            exclude: ['idRequest'],
            optional: ['passengerId']
          }),
        },
      },
    }) request: Omit<Request, 'idRequest'>,
  ): Promise<Request> {
    return this.passengerRepository.requests(id).create(request);
  }

  @patch('/passengers/{id}/requests', {
    responses: {
      '200': {
        description: 'Passenger.Request PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {partial: true}),
        },
      },
    })
    request: Partial<Request>,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.passengerRepository.requests(id).patch(request, where);
  }

  @del('/passengers/{id}/requests', {
    responses: {
      '200': {
        description: 'Passenger.Request DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Request)) where?: Where<Request>,
  ): Promise<Count> {
    return this.passengerRepository.requests(id).delete(where);
  }
}
