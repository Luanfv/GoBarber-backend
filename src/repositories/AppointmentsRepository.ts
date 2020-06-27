import Appointment from './../models/Appointment';
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
    name: string;
    date: Date;
}
class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public getAppointments(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
        
        return findAppointment || null;
    }

    public create({ name, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ name, date })
        this.appointments.push(appointment)

        return appointment
    }
}

export default AppointmentsRepository