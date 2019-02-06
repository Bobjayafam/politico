import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

let adminToken;
let user2Token;
let user3Token;

before(async () => {
  const result = await chai.request(server)
    .post('/api/v1/auth/login')
    .send({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
  adminToken = result.body.data[0].token;

  const res = await chai.request(server)
    .post('/api/v1/auth/login')
    .send({
      email: 'stapolly@yahoo.com',
      password: '123456',
    });
  user2Token = (res.body.data[0].token);

  const response = await chai.request(server)
    .post('/api/v1/auth/login')
    .send({
      email: 'georgeeano@yahoo.com',
      password: '123456',
    });
  user3Token = response.body.data[0].token;
});

describe('POST /api/v1/offices', () => {
  it('should create a new office with a genuine admin token', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .set('x-access-token', adminToken)
      .send({
        name: 'chairman',
        type: 'local government',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(201);
        done();
      });
  });

  it('should not create a new office with a bad token', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .set('x-access-token', 'adminToken')
      .send({
        name: 'chairman',
        type: 'local government',
      })
      .end((err, res) => {
        res.status.should.eql(401);
        done();
      });
  });

  it('should return an error when office name and type already exist', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .set('x-access-token', adminToken)
      .send({
        name: 'chairman',
        type: 'local government',
      })
      .end((err, res) => {
        res.status.should.eql(409);
        done();
      });
  });

  it('should return an error when type is not the expected input', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .set('x-access-token', adminToken)
      .send({ type: 'geeneral', name: 'president' })
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });

  it('should return an error when office name is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .set('x-access-token', adminToken)
      .send({ type: 'federal', name: '' })
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });

  it('should return an error when office type is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .set('x-access-token', adminToken)
      .send({ type: '', name: 'governor' })
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });
});

describe('GET /api/v1/offices', () => {
  it('should return all offices', (done) => {
    chai.request(server)
      .get('/api/v1/offices')
      .set('x-access-token', user2Token)
      .end((err, res) => {
        res.status.should.eql(200);
        done();
      });
  });

  it('should return a single office', (done) => {
    chai.request(server)
      .get('/api/v1/offices/1')
      .set('x-access-token', user2Token)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        done();
      });
  });


  it('should not return an office if the id is not valid', (done) => {
    chai.request(server)
      .get('/api/v1/offices/mnbvn')
      .set('x-access-token', user2Token)
      .end((err, res) => {
        res.status.should.eql(400);
        res.body.error.should.eql('Invalid id');
        done();
      });
  });

  it('should return an error if there is no office with the id', (done) => {
    chai.request(server)
      .get('/api/v1/offices/1000')
      .set('x-access-token', user2Token)
      .end((err, res) => {
        res.status.should.eql(404);
        res.body.error.should.eql('No office with such id');
        done();
      });
  });
});


describe('POST /api/v1/office/userId/register', () => {
  it('should register a user as a candidate', (done) => {
    chai.request(server)
      .post('/api/v1/offices/2/register')
      .set('x-access-token', adminToken)
      .send({
        office: 1,
        party: 3,
      })
      .end((err, res) => {
        res.status.should.eql(201);
        done();
      });
  });

  it('should return an error if the office id does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/offices/2/register')
      .set('x-access-token', adminToken)
      .send({
        office: 6,
        party: 3,
      })
      .end((err, res) => {
        res.status.should.eql(404);
        done();
      });
  });

  it('should return an error if the user id does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/offices/8/register')
      .set('x-access-token', adminToken)
      .send({
        office: 1,
        party: 3,
      })
      .end((err, res) => {
        res.status.should.eql(404);
        done();
      });
  });

  it('should return an error if the party id does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/offices/1/register')
      .set('x-access-token', adminToken)
      .send({
        office: 1,
        party: 13,
      })
      .end((err, res) => {
        res.status.should.eql(404);
        done();
      });
  });
});

describe('POST /api/v1/votes', () => {
  it('A candidate should be able to vote for a registered candidate', (done) => {
    chai.request(server)
      .post('/api/v1/votes')
      .set('x-access-token', user3Token)
      .send({ office: 1, candidate: 1 })
      .end((err, res) => {
        res.status.should.eql(201);
        done();
      });
  });

  it('should return an error for a if user wants to vote for the same candidate twice', (done) => {
    chai.request(server)
      .post('/api/v1/votes')
      .set('x-access-token', user3Token)
      .send({ office: 1, candidate: 1 })
      .end((err, res) => {
        res.status.should.eql(409);
        done();
      });
  });

  it('should return an error for a wrong office id', (done) => {
    chai.request(server)
      .post('/api/v1/votes')
      .set('x-access-token', user3Token)
      .send({ office: 100, candidate: 1 })
      .end((err, res) => {
        res.status.should.eql(404);
        done();
      });
  });
});

describe('GET /api/v1/offices/:officeId/result', () => {
  it('should return the election result of an office', (done) => {
    chai.request(server)
      .get('/api/v1/offices/1/result')
      .set('x-access-token', user3Token)
      .end((err, res) => {
        res.status.should.eql(200);
        done();
      });
  });

  it('should return an error for a wrong office id', (done) => {
    chai.request(server)
      .get('/api/v1/offices/100/result')
      .set('x-access-token', user3Token)
      .end((err, res) => {
        res.status.should.eql(404);
        done();
      });
  });
});
