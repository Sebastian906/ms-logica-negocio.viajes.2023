import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Driver,
  Request,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverRequestController {
  constructor(
    @repository(DriverRepository)
    public driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to Driver',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof Driver.prototype.idDriver,
  ): Promise<Request> {
    return this.driverRepository.request(id);
  }
}
