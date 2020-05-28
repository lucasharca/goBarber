import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositoriy';

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appoitment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      user_id,
      provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentServices;
