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
  Car,
  Driver,
} from '../models';
import {CarRepository} from '../repositories';

export class CarDriverController {
  constructor(
    @repository(CarRepository) protected carRepository: CarRepository,
  ) { }

  @get('/cars/{id}/driver', {
    responses: {
      '200': {
        description: 'Car has one Driver',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Driver>,
  ): Promise<Driver> {
    return this.carRepository.driver(id).get(filter);
  }

  @post('/cars/{id}/driver', {
    responses: {
      '200': {
        description: 'Car model instance',
        content: {'application/json': {schema: getModelSchemaRef(Driver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Car.prototype.idCar,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {
            title: 'NewDriverInCar',
            exclude: ['idDriver'],
            optional: ['carId']
          }),
        },
      },
    }) driver: Omit<Driver, 'idDriver'>,
  ): Promise<Driver> {
    return this.carRepository.driver(id).create(driver);
  }

  @patch('/cars/{id}/driver', {
    responses: {
      '200': {
        description: 'Car.Driver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Partial<Driver>,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.carRepository.driver(id).patch(driver, where);
  }

  @del('/cars/{id}/driver', {
    responses: {
      '200': {
        description: 'Car.Driver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.carRepository.driver(id).delete(where);
  }
}
