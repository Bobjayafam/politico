import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

const newUser = {
  firstname: 'David',
  lastname: 'Itoadon',
  othername: 'Omofoma',
  email: 'pastor_dave@yahoo.com',
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

  it('should return an error if the last name is not a string', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: null,
          othername: 'John',
          email: 'jjj@gmail.com',
          password: 'lioness',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the first name is not a string', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: null,
          lastname: 'James',
          othername: 'John',
          email: 'jjj@gmail.com',
          password: 'lion',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the last name is less than 2 characters', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'A',
          othername: 'John',
          email: 'jjj@gmail.com',
          password: 'lioness',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the first name is less than 2 characters', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'B',
          lastname: 'Anslem',
          othername: 'John',
          email: 'jjj@gmail.com',
          password: 'lioness',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the email field is empty', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: '',
          password: 'lion',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the email is invalid', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'hhssjsjjsjsjsjs',
          password: 'lion',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
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

  it('should return an error if the password is empty', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'bayo123@yahoo.com',
          password: '',
          passportUrl: 'http://nsjjksk.jpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the passporturl is not an image file', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'bayo123@yahoo.com',
          password: 'lioness',
          passportUrl: 'http://nsjjkskjpg',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the passporturl is empty', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'bayo123@yahoo.com',
          password: 'lioness',
          passportUrl: '',
          phoneNumber: '08025862169',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the phone number is invalid', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'bayo123@yahoo.com',
          password: 'lioness',
          passportUrl: 'http://nsjjkskjpg',
          phoneNumber: '08025862',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the phone number is empty', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Bayo',
          lastname: 'Ojo',
          othername: 'John',
          email: 'bayo123@yahoo.com',
          password: 'lioness',
          passportUrl: 'http://nsjjkskjpg',
          phoneNumber: '',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });
});

describe('POST /auth/login', () => {
  it('should return a token when supplied with valid credentials', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'stapolly@yahoo.com',
          password: '123456',
        });
      res.status.should.eql(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error when email is not correct', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'stapolly12@yahoo.com',
          password: '123456',
        });
      res.status.should.eql(401);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error when password is not correct', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'stapolly@yahoo.com',
          password: '123456789',
        });
      res.status.should.eql(401);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error when password is empty', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'stapolly@yahoo.com',
          password: '',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error when password is not correct', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: '123456789',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error when password is less than six characters', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'stapolly@yahoo.com',
          password: '1234',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error when email is invalid', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'stapollyyahoo.com',
          password: '123456',
        });
      res.status.should.eql(400);
    } catch (error) {
      console.log(error);
    }
  });
});
