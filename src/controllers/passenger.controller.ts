import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Passenger} from '../models';
import {PassengerRepository} from '../repositories';

export class PassengerController {
  constructor(
    @repository(PassengerRepository)
    public passengerRepository: PassengerRepository,
  ) {}

  @post('/passenger')
  @response(200, {
    description: 'Passenger model instance',
    content: {'application/json': {schema: getModelSchemaRef(Passenger)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Passenger, {
            title: 'NewPassenger',
            exclude: ['idPassenger'],
          }),
        },
      },
    })
    passenger: Omit<Passenger, 'idPassenger'>,
  ): Promise<Passenger> {
    return this.passengerRepository.create(passenger);
  }

  @get('/passenger/count')
  @response(200, {
    description: 'Passenger model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Passenger) where?: Where<Passenger>,
  ): Promise<Count> {
    return this.passengerRepository.count(where);
  }
  @authenticate({
    strategy: 'auth',
    options: [
      ConfiguracionSeguridad.permissionsUsuario,
      ConfiguracionSeguridad.listarAccion,
    ],
  })
  @get('/passenger')
  @response(200, {
    description: 'Array of Passenger model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Passenger, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Passenger) filter?: Filter<Passenger>,
  ): Promise<Passenger[]> {
    return this.passengerRepository.find(filter);
  }

  @patch('/passenger')
  @response(200, {
    description: 'Passenger PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Passenger, {partial: true}),
        },
      },
    })
    passenger: Passenger,
    @param.where(Passenger) where?: Where<Passenger>,
  ): Promise<Count> {
    return this.passengerRepository.updateAll(passenger, where);
  }

  @get('/passenger/{id}')
  @response(200, {
    description: 'Passenger model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Passenger, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Passenger, {exclude: 'where'})
    filter?: FilterExcludingWhere<Passenger>,
  ): Promise<Passenger> {
    return this.passengerRepository.findById(id, filter);
  }

  @patch('/passenger/{id}')
  @response(204, {
    description: 'Passenger PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Passenger, {partial: true}),
        },
      },
    })
    passenger: Passenger,
  ): Promise<void> {
    await this.passengerRepository.updateById(id, passenger);
  }

  @put('/passenger/{id}')
  @response(204, {
    description: 'Passenger PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() passenger: Passenger,
  ): Promise<void> {
    await this.passengerRepository.replaceById(id, passenger);
  }

  @del('/passenger/{id}')
  @response(204, {
    description: 'Passenger DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.passengerRepository.deleteById(id);
  }
}
