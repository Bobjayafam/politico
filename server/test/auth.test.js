import chai from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

const newUser = {
  firstname: 'Stanley',
  lastname: 'Obi',
  othername: 'Abanum',
  email: 'stapolly@yahoo.com',
  password: '123456',
  phoneNumber: '09034589684',
  passportUrl: 'http://kkssls.jpg',
};

const newUser1 = {
  firstname: '',
  lastname: 'Ogun',
  othername: 'Bayo',
  email: 'bayo@yahoo.com',
  password: '123456',
  phoneNumber: '09034589684',
  passportUrl: 'http://kkssls.jpg',
};

describe('POST /api/v1/auth/signup', () => {
  it('should signup a user', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send(newUser);
      res.status.should.eql(201);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the same email has been used to sign up before', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send(newUser);
      res.status.should.eql(409);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the firstname or last name is empty', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send(newUser1);
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the password is less than 6 characters', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'bayo123@yahoo.com',
          password: 'lion',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });
});
