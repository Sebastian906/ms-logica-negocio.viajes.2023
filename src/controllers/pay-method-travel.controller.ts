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
  Travel,
} from '../models';
import {PayMethodRepository} from '../repositories';

export class PayMethodTravelController {
  constructor(
    @repository(PayMethodRepository) protected payMethodRepository: PayMethodRepository,
  ) { }

  @get('/pay-methods/{id}/travels', {
    responses: {
      '200': {
        description: 'Array of PayMethod has many Travel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Travel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Travel>,
  ): Promise<Travel[]> {
    return this.payMethodRepository.travels(id).find(filter);
  }

  @post('/pay-methods/{id}/travels', {
    responses: {
      '200': {
        description: 'PayMethod model instance',
        content: {'application/json': {schema: getModelSchemaRef(Travel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PayMethod.prototype.idPayMethod,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {
            title: 'NewTravelInPayMethod',
            exclude: ['idTravel'],
            optional: ['payMethodId']
          }),
        },
      },
    }) travel: Omit<Travel, 'idTravel'>,
  ): Promise<Travel> {
    return this.payMethodRepository.travels(id).create(travel);
  }

  @patch('/pay-methods/{id}/travels', {
    responses: {
      '200': {
        description: 'PayMethod.Travel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Travel, {partial: true}),
        },
      },
    })
    travel: Partial<Travel>,
    @param.query.object('where', getWhereSchemaFor(Travel)) where?: Where<Travel>,
  ): Promise<Count> {
    return this.payMethodRepository.travels(id).patch(travel, where);
  }

  @del('/pay-methods/{id}/travels', {
    responses: {
      '200': {
        description: 'PayMethod.Travel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Travel)) where?: Where<Travel>,
  ): Promise<Count> {
    return this.payMethodRepository.travels(id).delete(where);
  }
}
