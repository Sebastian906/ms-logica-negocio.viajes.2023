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
  Driver,
  Car,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverCarController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/car', {
    responses: {
      '200': {
        description: 'Driver has one Car',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Car),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Car>,
  ): Promise<Car> {
    return this.driverRepository.car(id).get(filter);
  }

  @post('/drivers/{id}/car', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Car)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Driver.prototype.idDriver,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {
            title: 'NewCarInDriver',
            exclude: ['idCar'],
            optional: ['driverId']
          }),
        },
      },
    }) car: Omit<Car, 'idCar'>,
  ): Promise<Car> {
    return this.driverRepository.car(id).create(car);
  }

  @patch('/drivers/{id}/car', {
    responses: {
      '200': {
        description: 'Driver.Car PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {partial: true}),
        },
      },
    })
    car: Partial<Car>,
    @param.query.object('where', getWhereSchemaFor(Car)) where?: Where<Car>,
  ): Promise<Count> {
    return this.driverRepository.car(id).patch(car, where);
  }

  @del('/drivers/{id}/car', {
    responses: {
      '200': {
        description: 'Driver.Car DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Car)) where?: Where<Car>,
  ): Promise<Count> {
    return this.driverRepository.car(id).delete(where);
  }
}
