import AppError from '@shared/errors/AppError';
import FakeAppoitnemntsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentServices';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppoitnemntsRepository = new FakeAppoitnemntsRepository();
    const createAppoitnemnt = new CreateAppointmentService(
      fakeAppoitnemntsRepository,
    );

    const appointment = await createAppoitnemnt.execute({
      date: new Date(),
      provider_id: '123432123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123432123');
  });

  it('it should not be able to create two appointments at the same hour', async () => {
    const fakeAppoitnemntsRepository = new FakeAppoitnemntsRepository();
    const createAppoitnemnt = new CreateAppointmentService(
      fakeAppoitnemntsRepository,
    );

    const appointmentDate = new Date(2020, 8, 10, 11);

    await createAppoitnemnt.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppoitnemnt.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});