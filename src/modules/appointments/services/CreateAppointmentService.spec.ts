import AppError from '@shared/errors/AppError';
import FakeAppoitnemntsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentServices';

let fakeAppoitnemntsRepository: FakeAppoitnemntsRepository;
let createAppoitnemnt: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppoitnemntsRepository = new FakeAppoitnemntsRepository();
    createAppoitnemnt = new CreateAppointmentService(
      fakeAppoitnemntsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppoitnemnt.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '123432123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123432123');
  });

  it('it should not be able to create two appointments at the same hour', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11);
    await createAppoitnemnt.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123456',
    });

    await expect(
      createAppoitnemnt.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoitnemnt.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoitnemnt.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoitnemnt.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppoitnemnt.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
