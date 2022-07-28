import mongoose from 'mongoose';
import supertest from 'supertest';

import Patient from '@models/Patient';

import app from '../app';

const request = supertest(app);

describe('Patients endpoints tests', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  afterEach(async () => {
    Patient.deleteMany({});
  });

  it('should return all patients', async () => {
    const response = await request.get('/patients');

    expect(response.status).toBe(200);
  });

  it('should return one patient by its id', async () => {
    const mockPatient = {
      gender: 'female',
      name: { title: 'Ms', first: 'Leila', last: 'Rocha' },
      location: {
        street: { number: 2228, name: 'Rua Vinte E Dois ' },
        city: 'Franca',
        state: 'Santa Catarina',
        country: 'Brazil',
        postcode: 87638,
        coordinates: { latitude: '83.4520', longitude: '146.6334' },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'leila.rocha@example.com',
      login: {
        uuid: '8db33e5e-df40-42ac-a352-ad11b77d957e',
        username: 'blackmouse871',
        password: 'enternow',
        salt: '7rcjOWAp',
        md5: 'c2f399aa36f652e94798f7ca8b256f75',
        sha1: 'dfe700fa085b52c2851c2b0a48631cd112d4b026',
        sha256:
          'f62586b9941867045d1566c84b8ad1267330331ca0448e302aaaf5ef09865540',
      },
      dob: { date: '1951-01-24T22:26:53.834Z', age: 69 },
      registered: { date: '2004-02-22T22:24:28.185Z', age: 16 },
      phone: '(44) 8534-8999',
      cell: '(41) 3961-9010',
      id: { name: '', value: null },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/70.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/70.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/70.jpg',
      },
      nat: 'BR',
    };

    const patient = await Patient.create(mockPatient);

    const response = await request.get(`/patients/${patient._id}`);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).name).toEqual(mockPatient.name);
  });

  it('should change patient info', async () => {
    const mockPatient = {
      gender: 'female',
      name: { title: 'Ms', first: 'Leila', last: 'Rocha' },
      location: {
        street: { number: 2228, name: 'Rua Vinte E Dois ' },
        city: 'Franca',
        state: 'Santa Catarina',
        country: 'Brazil',
        postcode: 87638,
        coordinates: { latitude: '83.4520', longitude: '146.6334' },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'leila.rocha@example.com',
      login: {
        uuid: '8db33e5e-df40-42ac-a352-ad11b77d957e',
        username: 'blackmouse871',
        password: 'enternow',
        salt: '7rcjOWAp',
        md5: 'c2f399aa36f652e94798f7ca8b256f75',
        sha1: 'dfe700fa085b52c2851c2b0a48631cd112d4b026',
        sha256:
          'f62586b9941867045d1566c84b8ad1267330331ca0448e302aaaf5ef09865540',
      },
      dob: { date: '1951-01-24T22:26:53.834Z', age: 69 },
      registered: { date: '2004-02-22T22:24:28.185Z', age: 16 },
      phone: '(44) 8534-8999',
      cell: '(41) 3961-9010',
      id: { name: '', value: null },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/70.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/70.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/70.jpg',
      },
      nat: 'BR',
    };

    const patient = await Patient.create(mockPatient);

    const newInfo = { ...mockPatient };

    newInfo.name.first = 'teste';

    const response = await request
      .put(`/patients/${patient._id}`)
      .send(newInfo);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).name.first).toEqual(newInfo.name.first);
  });

  it('should delete patient', async () => {
    const mockPatient = {
      gender: 'female',
      name: { title: 'Ms', first: 'Leila', last: 'Rocha' },
      location: {
        street: { number: 2228, name: 'Rua Vinte E Dois ' },
        city: 'Franca',
        state: 'Santa Catarina',
        country: 'Brazil',
        postcode: 87638,
        coordinates: { latitude: '83.4520', longitude: '146.6334' },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'leila.rocha@example.com',
      login: {
        uuid: '8db33e5e-df40-42ac-a352-ad11b77d957e',
        username: 'blackmouse871',
        password: 'enternow',
        salt: '7rcjOWAp',
        md5: 'c2f399aa36f652e94798f7ca8b256f75',
        sha1: 'dfe700fa085b52c2851c2b0a48631cd112d4b026',
        sha256:
          'f62586b9941867045d1566c84b8ad1267330331ca0448e302aaaf5ef09865540',
      },
      dob: { date: '1951-01-24T22:26:53.834Z', age: 69 },
      registered: { date: '2004-02-22T22:24:28.185Z', age: 16 },
      phone: '(44) 8534-8999',
      cell: '(41) 3961-9010',
      id: { name: '', value: null },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/70.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/70.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/70.jpg',
      },
      nat: 'BR',
    };

    const patient = await Patient.create(mockPatient);

    const response = await request.delete(`/patients/${patient._id}`);

    expect(response.status).toBe(204);
  });
});
