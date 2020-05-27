import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepositoriy';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private apppointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.apppointmentRepository.findAllInMonthFromProvider(
      { provider_id, year, month },
    );

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
