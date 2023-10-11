import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PayMethod,
  Passenger,
} from '../models';
import {PayMethodRepository} from '../repositories';

export class PayMethodPassengerController {
  constructor(
    @repository(PayMethodRepository)
    public payMethodRepository: PayMethodRepository,
  ) { }

  @get('/pay-methods/{id}/passenger', {
    responses: {
      '200': {
        description: 'Passenger belonging to PayMethod',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Passenger),
          },
        },
      },
    },
  })
  async getPassenger(
    @param.path.number('id') id: typeof PayMethod.prototype.idPayMethod,
  ): Promise<Passenger> {
    return this.payMethodRepository.passenger(id);
  }
}
