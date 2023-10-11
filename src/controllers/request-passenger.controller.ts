import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Request,
  Passenger,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestPassengerController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/passenger', {
    responses: {
      '200': {
        description: 'Passenger belonging to Request',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Passenger),
          },
        },
      },
    },
  })
  async getPassenger(
    @param.path.number('id') id: typeof Request.prototype.idRequest,
  ): Promise<Passenger> {
    return this.requestRepository.passenger(id);
  }
}
